import { Project, myProjects } from "./index.js";


function displayProjectsOverview() {
    const content = document.querySelector("div#content");

    const pageTitle = document.createElement("div")
    pageTitle.classList.add("page-title");
    pageTitle.textContent = "OVERVIEW OF PROJECTS";

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.textContent = "Add Project";

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
            displayProjectsOverview();
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

    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

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

        removeProjectBtn.addEventListener("click", (e) => {
            myProjects.splice(Number(e.target.id), 1);
            displayProjectsOverview(); 
        })

        btnContainer.append(removeProjectBtn);
        projectContainer.append(titleOfProject, btnContainer);
        projectsContainer.append(projectContainer);
    }

    content.append(pageTitle, addProjectBtn, outputBox, projectsContainer, addProjectDialog);
}

export { displayProjectsOverview };