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

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", `task-${itemsContainer.children.length/2}`);
        newLabel.setAttribute("id", `task-${itemsContainer.children.length/2}`);

        const newItem = document.createElement("input");
        newItem.setAttribute("name", "new-task");
        newItem.setAttribute("class", "new-task");
        newItem.setAttribute("value", "");
        newItem.setAttribute("id", `task-${itemsContainer.children.length/2}`);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("id", `task-${itemsContainer.children.length/2}`);

        listItemContainer.append(newItem, newLabel, editBtn);
        createRemoveItemBtn(newItem, newLabel, editBtn, listItemContainer)

        // add editBtnListener function here 

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
        const itemToRemove = document.getElementById(item.id);
        listItemContainer.removeChild(itemToRemove);
        const labelToRemove = document.getElementById(label.id);
        listItemContainer.removeChild(labelToRemove);
        const editBtnToRemove = document.getElementById(editBtn.id);
        listItemContainer.removeChild(editBtnToRemove);
        e.target.remove();
    });

    listItemContainer.append(removeItemBtn);
}

// edit button listener function


export { displayProjectPage, addItemsToProject, addDescriptionToItems}