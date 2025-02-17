import { content } from "./index.js";

function displayProjectPage(project) {

    while (content.firstChild) {
        content.replaceChildren();
    }

    const projectWithItemsContainer = document.createElement("div");
    projectWithItemsContainer.classList.add("project-with-items-container");

    const projectWithItemsTitle = document.createElement("div");
    projectWithItemsTitle.classList.add("project-with-items-title");
    projectWithItemsTitle.textContent = `${project.projectTitle}`;

    projectWithItemsContainer.append(projectWithItemsTitle);

    editDialog(); //// may be able to just always have the editDialog running in background
    addItemsToProject();

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

        const dueDate = document.createElement("div");
        dueDate.classList.add("due-date-div");
        dueDate.setAttribute("id", `task-${itemsContainer.children.length}`);

        const priorityStatus = document.createElement("div");
        priorityStatus.classList.add("priority-status-div");
        priorityStatus.setAttribute("id", `task-${itemsContainer.children.length}`);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("id", `task-${itemsContainer.children.length}`);

        listItemContainer.append(newItem, newLabel, dueDate, priorityStatus, editBtn);
        createRemoveItemBtn(newItem, listItemContainer);

        editBtnAction(listItemContainer);
        cancelDialogBtn();

        addDescriptionToItems(newItem, newLabel);

        itemsContainer.append(listItemContainer);

    })

    content.append(itemsContainer, addItemsBtn);
    submitBtnAction();
};

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
function createRemoveItemBtn(newItem, listItemContainer) {
    let item = newItem;

    const removeItemBtn = document.createElement("button");
    removeItemBtn.classList.add("remove-item-btn");
    removeItemBtn.textContent = "X";
    removeItemBtn.id = item.id;

    removeItemBtn.addEventListener("click", (e) => {
        listItemContainer.remove();
    });

    listItemContainer.append(removeItemBtn);
}

// create editDialog

function editDialog() { 
    const editDialog = document.createElement("dialog");
    editDialog.id = "edit-dialog";
    const editForm = document.createElement("form");
    editForm.setAttribute("method", "dialog");

    const editItemTaskLabel = document.createElement("label");
    editItemTaskLabel.setAttribute("for", "edit-item-task");
    editItemTaskLabel.textContent = "Task (required): ";

    const editItemTaskInput = document.createElement("input");
    editItemTaskInput.setAttribute("id", "edit-item-task");
    editItemTaskInput.setAttribute("name", "edit-item-task");
    editItemTaskInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "due-date");
    dueDateLabel.textContent = "Due Date: ";

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("id", "due-date");
    dueDateInput.setAttribute("name", "due-date");

    const priorityStatusLabel = document.createElement("label");
    priorityStatusLabel.setAttribute("for", "priority-status");
    priorityStatusLabel.textContent = "Priority Status: "

    const priorityStatusInput = document.createElement("select");
    priorityStatusInput.setAttribute("id", "priority-status");
    priorityStatusInput.setAttribute("name", "priority-status");
    
    const optionHigh = document.createElement("option");
    optionHigh.setAttribute("value", "high");
    optionHigh.textContent = "High";

    const optionNormal = document.createElement("option");
    optionNormal.setAttribute("value", "normal");
    optionNormal.textContent = "Normal";

    const optionLow = document.createElement("option");
    optionLow.setAttribute("value", "low");
    optionLow.textContent = "Low";

    priorityStatusInput.append(optionHigh, optionNormal, optionLow);

    const dialogBtnsContainer = document.createElement("div");
    dialogBtnsContainer.classList.add("dialog-btns-container");
    
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-btn");
    submitBtn.textContent = "Submit";

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.setAttribute("formnovalidate", "true");
    cancelBtn.setAttribute("value", "default");
    cancelBtn.textContent = "Cancel";

    dialogBtnsContainer.append(submitBtn, cancelBtn);
    editForm.append(editItemTaskLabel, editItemTaskInput, dueDateLabel, dueDateInput, priorityStatusLabel, priorityStatusInput);
    editDialog.append(editForm, dialogBtnsContainer);
    
    content.append(editDialog);
}


function cancelDialogBtn() {
    const cancelBtn = document.querySelector(".cancel-btn");
    const editDialog = document.querySelector("dialog");
    cancelBtn.addEventListener("click", () => {
        editDialog.close();
    })
}


function editBtnAction(listItemContainer) {
    const allEditBtns = listItemContainer.querySelectorAll(".edit-btn");
    const editDialog = document.querySelector("dialog");
    const taskNameDialog = document.querySelector("#edit-item-task");
    const dueDateDialog = document.querySelector("#due-date");
    const priorityStatusDialog = document.querySelector("#priority-status");

    allEditBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", (e) => {
            const identification = e.target.id;
            const inputDisplay = document.querySelector(`input#${identification}`);
            const labelDisplay = document.querySelector(`label#${identification}`);
            const dueDateDisplay = document.querySelector(`.due-date-div#${identification}`);
            const priorityStatusDisplay = document.querySelector(`.priority-status-div#${identification}`);

            // pull up the edit Dialog module with the specific values of the items being edited
            taskNameDialog.value = labelDisplay.textContent;
            dueDateDialog.value = dueDateDisplay.textContent;
            priorityStatusDialog.value = priorityStatusDisplay.textContent;
            editDialog.showModal();

            // submit btn needs to be linked to which edit button was pressed to update the right field
            const submitBtn = document.querySelector(".submit-btn");
            submitBtn.id = e.target.id;

            console.log(`After edit, before submit button: ${labelDisplay.id}`);

        })
    })
}


function submitBtnAction() {
    // this submitBtn ID will be updated with ID by edit button since submit only shows up after edit clicked
    const submitBtn = document.querySelector(".submit-btn"); 

    const editForm = document.querySelector("form");
    const editDialog = document.querySelector("dialog");
    const taskNameDialog = document.querySelector("#edit-item-task");
    const dueDateDialog = document.querySelector("#due-date");
    const priorityStatusDialog = document.querySelector("#priority-status");

    submitBtn.addEventListener("click", (e) => {

        if (!editForm.checkValidity()) {
            alert("Please fill out all of the required elements.");
        } else {
            const identification = e.target.id;
            console.log(`Submit button inside submitBtnAction click listener: ${submitBtn.id} and ${e.target.id}`);

            const inputDisplay = document.querySelector(`input#${identification}`);
            const labelDisplay = document.querySelector(`label#${identification}`);
            const dueDateDisplay = document.querySelector(`.due-date-div#${identification}`);
            const priorityStatusDisplay = document.querySelector(`.priority-status-div#${identification}`);
            
            inputDisplay.setAttribute("type", "checkbox");
            labelDisplay.textContent = taskNameDialog.value;
            dueDateDisplay.textContent = dueDateDialog.value;
            priorityStatusDisplay.textContent = priorityStatusDialog.value;

            sortContainer();
            editDialog.close();
        }
    })
}

//////////// include 3rd step of sorting by text string vs empty strings to bottom

function sortContainer() {
    const itemsContainer = document.querySelector(".items-container");
    const items = Array.from(itemsContainer.getElementsByClassName("list-item-container"));

    items.sort((a,b) => {

        let priorityA = a.querySelector(".priority-status-div").textContent;
        let priorityB = b.querySelector(".priority-status-div").textContent;

        if (priorityA == "high") {
            priorityA = -1;
        } else if (priorityA == "normal") {
            priorityA = 0;
        } else if (priorityA == "low") {
            priorityA = 1;
        } else {
            priorityA = 2;
        }

        if (priorityB == "high") {
            priorityB = -1;
        } else if (priorityB == "normal") {
            priorityB = 0;
        } else if (priorityA == "low") {
            priorityB = 1;
        } else {
            priorityB = 2;
        }

        return priorityA - priorityB;
    })

    console.log(`after priority sorting: ${items}`);

    items.sort((a,b) => {
        const dateA = new Date(a.querySelector(".due-date-div").textContent);
        const dateB = new Date(b.querySelector(".due-date-div").textContent);

        // for empty columns
        const isValidDateA = !isNaN(dateA);
        const isValidDateB = !isNaN(dateB);

        if (!isValidDateA && !isValidDateB) {
            return 0;
        } else if (!isValidDateA) {
            return 1;
        } else if (!isValidDateB) {
            return -1;
        } else {
            return dateA - dateB;
        }
    });

    console.log(`after priority AND due date sorting: ${items}`);

    items.forEach(item => itemsContainer.appendChild(item));

}

//// local storage elements needed to add for the following scenarios
// use nested objects and stringify and parse JSON code 
/// 1) when you navigate to another page
/// 2) when you click projects overview button 

// first function will clear out current storage elements for the specific project 
// then the project will stringify and store current page elements into local storage for #1 and #2
// when the page is loaded from the spec proj button the overviews page, it will retrieve the local storage and populate items

function storeToDoList() {
    if (document.querySelector(".project-with-items-title")) {
        let key = document.querySelector(".project-with-items-title").textContent;

        // Select all labels / to-do-items that have text content

        const allToDoLabels = document.querySelectorAll('div.list-item-container > label');
        console.log(allToDoLabels);

        // filter out all to do labels to only those with text content
        let allToDoLabelsArray = Array.from(allToDoLabels);
        const labelsWithText = allToDoLabelsArray.filter(task => task.textContent.trim() !== "");

        let projectStorageObject = {};

        console.log(labelsWithText);

        labelsWithText.forEach(label => {
            let taskNumber = label.id;
            console.log(taskNumber);
            const taskDescription = document.querySelector(`label#${taskNumber}`).textContent;
            const dueDateInObject = document.querySelector(`.due-date-div#${taskNumber}`).textContent;
            const prioStatusInObject = document.querySelector(`.priority-status-div#${taskNumber}`).textContent;

            projectStorageObject[taskNumber] = {
                task: taskDescription,
                dueDate: dueDateInObject,
                prioStatus: prioStatusInObject
            };

            // in future to access
            // projectStorageObject.${taskNumber}.task should return ${taskDescription}
            // projectStorageObject[taskNumber].task should return ${taskDescription}
        })

        console.log(projectStorageObject);
        // stringify object for storing into local storage 
        let stringifiedObject = JSON.stringify(projectStorageObject);

        // store string into local storage where key is the specific project name 
        localStorage.setItem(key, stringifiedObject);
    }
}

function getToDoList() {
    if (document.querySelector(".project-with-items-title")) {
        let key = document.querySelector(".project-with-items-title").textContent;

        let retrievedObject = JSON.parse(localStorage.getItem(key));

        // now need to popuulate the fields with the values from the object 

        //get all of the keys/#tasks from retrieved object
        const allKeys = Object.keys(retrievedObject);

        const numberOfTasks = Number(allKeys.length);

        const allTasksContainer = document.querySelector(".items-container");

        for (let i=0; i < numberOfTasks; i++) {
            const newIndividualTaskContainer = document.createElement("div");
            newIndividualTaskContainer.classList.add("list-item-container");
            newIndividualTaskContainer.setAttribute(`id`, `task-${i}`);

            const newInput = document.createElement("input");
            newInput.classList.add("new-task");
            newInput.setAttribute(`id`, `task-${i}`);
            newInput.setAttribute("type", "checkbox");

            const newLabel = document.createElement("label");
            newLabel.setAttribute(`for`, `task-${i}`);
            newLabel.setAttribute(`id`, `task-${i}`);
            newLabel.textContent = `${retrievedObject[i].task}`;
                        
            const newDueDate = document.createElement("div");
            newDueDate.classList.add("due-date-div");
            newDueDate.setAttribute(`id`, `task-${i}`);
            newDueDate.textContent = `${retrievedObject[i].dueDate}`;

            const newPS = document.createElement("div");
            newPS.classList.add("priority-status-div");
            newPS.setAttribute(`id`, `task-${i}`);
            newPS.textContent = `${retrievedObject[i].prioStatus}`;

            const newEditBtn = document.createElement("button");
            newEditBtn.classList.add("edit-btn");
            newEditBtn.setAttribute(`id`, `task-${i}`);
            newEditBtn.textContent = "Edit";

            const newRemoveBtn = document.createElement("button");
            newRemoveBtn.classList.add("remove-item-btn");
            newRemoveBtn.setAttribute(`id`, `task-${i}`);
            newRemoveBtn.textContent = "X";

            newIndividualTaskContainer.append(newInput, newLabel, newDueDate, newPS, newEditBtn, newRemoveBtn);
            allTasksContainer.append(newIndividualTaskContainer)
        }

    }   
}



export { displayProjectPage, addItemsToProject, addDescriptionToItems, editDialog, cancelDialogBtn, editBtnAction, sortContainer,storeToDoList, getToDoList }