import { ToDoItem, Project, content } from "./index.js";

function displayProjectPage(project) {
    const projectWithItemsContainer = document.createElement("div");
    projectWithItemsContainer.classList.add("project-with-items-container");

    const projectWithItemsTitle = document.createElement("div");
    projectWithItemsTitle.classList.add("project-with-items-title");
    projectWithItemsTitle.textContent = `${project.projectTitle}`;

    projectWithItemsContainer.append(projectWithItemsTitle);

    content.append(projectWithItemsContainer);
}

// add To-Do item to the project 

function addItemsToProject() {
    const itemsContainer = document.createElement("div");
    itemsContainer.classList.add("items-container");

    const addItemsBtn = document.createElement("button");
    addItemsBtn.classList.add("add-items-button");
    addItemsBtn.textContent = "Add To-Do Item";

    addItemsBtn.addEventListener("click", () => {

        const listItemContainer = document.createElement("div");
        listItemContainer.classList.add("list-item-container");
        listItemContainer.setAttribute("id", `task-${itemsContainer.children.length}`);

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", `task-${itemsContainer.children.length}`);
        newLabel.setAttribute("id", `task-${itemsContainer.children.length}`);

        const newItem = document.createElement("input");
        newItem.setAttribute("name", "new-task");
        newItem.setAttribute("class", "new-task");
        newItem.setAttribute("value", "");
        newItem.setAttribute("id", `task-${itemsContainer.children.length}`);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("id", `task-${itemsContainer.children.length}`);

        listItemContainer.append(newItem, newLabel, editBtn);
        createRemoveItemBtn(newItem, newLabel, editBtn, listItemContainer)

        editBtn.addEventListener("click", () => {
            const editDialog = document.querySelector("dialog");
            editDialog.showModal();
        });

        addDescriptionToItems(newItem, newLabel);

        itemsContainer.append(listItemContainer)
    })

    content.append(itemsContainer, addItemsBtn);
}

// Handles when pressing "Enter" or "Blur" event occurs after text input into the field
function addDescriptionToItems(newItem, newLabel) {
    let item = newItem;
    let label = newLabel;

    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (item.value == "") {
                item.type = "text";
            } else {
                item.type = "checkbox";
                label.textContent = item.value;
            }
        }
    })

    item.addEventListener("blur", () => {
        setTimeout(() => {
            if (item.parentNode) {
                if (item.value == "") {
                    item.type = "text";
                } else {
                    item.type = "checkbox";
                    label.textContent = item.value;
                }
            }
        }, 0)
    })
}

// creates the Remove Button associated wtih each item task 
function createRemoveItemBtn(newItem, newLabel, newEditBtn, listItemContainer) {
    let item = newItem;
    let label = newLabel;
    let editBtn = newEditBtn;

    const removeItemBtn = document.createElement("button");
    removeItemBtn.classList.add("remove-item-btn");
    removeItemBtn.textContent = "X";
    removeItemBtn.id = item.id;

    removeItemBtn.addEventListener("click", (e) => {
        listItemContainer.remove();
    });

    listItemContainer.append(removeItemBtn);
}

// edit button listener function
function editDialog() {
    const editDialog = document.createElement("dialog");
    editDialog.id = "edit-dialog";
    const editForm = document.createElement("form");
    editForm.setAttribute("method", "dialog");

    const editItemTaskLabel = document.createElement("label");
    editItemTaskLabel.setAttribute("for", "edit-item-task");
    editItemTaskLabel.textContent = "Task: ";

    const editItemTaskInput = document.createElement("input");
    editItemTaskInput.setAttribute("id", "edit-item-task");
    editItemTaskInput.setAttribute("name", "edit-item-task");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "due-date");
    dueDateLabel.textContent = "Due Date: ";

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("id", "due-date");
    dueDateInput.setAttribute("name", "due-date");

    const priorityStatusLabel = document.createElement("label");
    priorityStatusLabel.setAttribute("for", "priority-status");
    priorityStatusLabel.textContent = "Priority Status: "

    const priorityStatusInput = document.createElement("input");
    priorityStatusInput.setAttribute("id", "priority-status");
    priorityStatusInput.setAttribute("name", "priority-status");

    const dialogBtnsContainer = document.createElement("div");
    dialogBtnsContainer.classList.add("dialog-btns-container");
    
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-btn");
    submitBtn.setAttribute("value", "default"); // sets submit button return value to default
    submitBtn.textContent = "Submit";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.setAttribute("formnovalidate", "true");
    cancelBtn.setAttribute("value", "default");
    cancelBtn.textContent = "Cancel";

    submitBtn.addEventListener("click", () => {
        if (!editForm.checkValidity()) {
            alert("Please fill out all of the required elements.");
        } else {
            let editedItemTask = editItemTaskInput.value;
            let editedDueDate = dueDateInput.value;
            let editedPriorityStatus = priorityStatusInput.value;

            editItemTaskInput.value = "";
            dueDateInput.value = "";
            priorityStatusInput.value = "";

            editDialog.close();
        }
    });

    editDialog.addEventListener("close", () => {
        // new values will be created into the text box on close 
        if (editDialog.returnValue === "default") {
            return;
        } else {
            // empty out list-item-container with child elements
            // add corresponding input values of editedItemTask, editedDueDate, and editedPriorityStatus to list-item-container
            // empty out input values for next form
        }
    })

    dialogBtnsContainer.append(submitBtn, cancelBtn);
    editForm.append(editItemTaskLabel, editItemTaskInput, dueDateLabel, dueDateInput, priorityStatusLabel, priorityStatusInput);
    editDialog.append(editForm, dialogBtnsContainer);
    
    content.append(editDialog);
}



export { displayProjectPage, addItemsToProject, addDescriptionToItems, editDialog }