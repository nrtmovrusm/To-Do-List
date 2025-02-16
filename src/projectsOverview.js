import { content, Project, myProjects } from "./index.js";

function projectsOverview() {
    content.replaceChildren();

    const pageTitle = document.createElement("div")
    pageTitle.classList.add("page-title");
    pageTitle.textContent = "OVERVIEW OF PROJECTS";

    content.append(pageTitle);

    addProjects();

    displayProjects();

}


function displayProjects() {
    let projectsContainer;

    if (document.querySelector(".projects-container")) {
        projectsContainer = document.querySelector(".projects-container")
        projectsContainer.replaceChildren();
    } else {
        projectsContainer = document.createElement("div");
        projectsContainer.classList.add("projects-container");
    }

    for (const [index, project] of myProjects.entries()) {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        const titleOfProject = document.createElement("div");
        titleOfProject.classList.add("project-title");
        titleOfProject.textContent = `${project.projectTitle}`;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("project-btn-container");
        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("remove-project-btn");
        removeProjectBtn.textContent = "Remove";
        removeProjectBtn.id = `${index}`;

        removeProjectBtn.addEventListener("click", (e) => {
            myProjects.splice(Number(e.target.id), 1);
            displayProjects(); 
        })

        btnContainer.append(removeProjectBtn);
        projectContainer.append(titleOfProject, btnContainer);
        projectsContainer.append(projectContainer);
    }

    // add additional button for every new project item 

    let projBtnContainer;

    if (document.querySelector(".each-proj-btn-container")) {
        projBtnContainer = document.querySelector(".each-proj-btn-container")
        projBtnContainer.replaceChildren();
    } else {
        projBtnContainer = document.createElement("div");
        projBtnContainer.classList.add("each-proj-btn-container");
    }

    for (const [index, project] of myProjects.entries()) {
        const projBtn = document.createElement("button");
        projBtn.classList.add("each-project-button");
        projBtn.setAttribute(`id`, `projwxr-${index}-btn`);
        projBtn.textContent = `${project.projectTitle}`;

        projBtnContainer.append(projBtn);
    }

    content.append(projectsContainer, projBtnContainer);
}


function addProjects() {
    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.textContent = "Add New Project";

    const outputBox = document.createElement("output");

    // create dialog that appears after addProjectBtn clicked 
    const addProjectDialog = document.createElement("dialog");
    addProjectDialog.id = "add-project-dialog";
    const addForm = document.createElement("form");
    addForm.setAttribute("method", "dialog");

    const addTitleLabel = document.createElement("label");
    addTitleLabel.setAttribute("for", "add-project-title");
    addTitleLabel.textContent = `Project Title (required):`;
    const addTitleInput = document.createElement("input");
    addTitleInput.setAttribute("id", "add-project-title");
    addTitleInput.setAttribute("name", "add-project-title");
    addTitleInput.required = true;

    const addDescLabel = document.createElement("label");
    addDescLabel.setAttribute("for", "add-project-desc");
    addDescLabel.textContent = "Description:";
    const addDescrInput = document.createElement("input");
    addDescrInput.setAttribute("id", "add-project-desc");
    addDescrInput.setAttribute("name", "add-project-desc");

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
        if (!addForm.checkValidity()) {
            alert("Please fill out all of the required elements.");
        } else {
            let addedProject = new Project(addTitleInput.value, addDescrInput.value);
            addedProject.createProject();
            addTitleInput.value = "";
            addDescrInput.value = "";
            displayProjects();
            addProjectDialog.returnValue = addedProject.projectTitle;
            addProjectDialog.close();
        }
    });

    addProjectDialog.addEventListener("close", () => {
        outputBox.textContent = 
            addProjectDialog.returnValue === "default" 
            ? "No project was added." 
            : `Project: ${addProjectDialog.returnValue} was added.`;

        addTitleInput.value = "";
        addDescrInput.value = "";
    });

    addProjectBtn.addEventListener("click", () => {
        addProjectDialog.showModal();
    })

    dialogBtnsContainer.append(submitBtn, cancelBtn);
    addForm.append(addTitleLabel, addTitleInput, addDescLabel, addDescrInput, dialogBtnsContainer);
    addProjectDialog.append(addForm);

    content.append(addProjectBtn, outputBox, addProjectDialog);
}

export { projectsOverview };