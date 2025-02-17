import { content, Project, myProjects, project1, project2 } from "./index.js";
import { displayProjectPage, getToDoList } from "./addItemsToProjects.js";

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
        projectsContainer = document.querySelector(".projects-container");
        projectsContainer.replaceChildren();

    } else {
        projectsContainer = document.createElement("div");
        projectsContainer.classList.add("projects-container");
    }

    // before myProjects entries need to use getDataProjOverview();

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
    // need to remove pre-existing buttons after additional ones are created 

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
        projBtn.setAttribute(`id`, `project-${index}-btn`);
        projBtn.textContent = `${project.projectTitle}`;

        projBtnContainer.append(projBtn);
    }

    const allProjBtns = projBtnContainer.querySelectorAll(".each-project-button");

    allProjBtns.forEach(specProjBtn => {
        specProjBtn.addEventListener("click", (e) => {
            let specificProject = new Project(`${e.target.textContent}`, "Description");
            console.log(specificProject);
            setDataProjOverview(); //////////////////////// after specific proj btn nav clicked, set local storage of current data
            displayProjectPage(specificProject);
        });
    })

    content.append(projectsContainer, projBtnContainer);

    setDataProjOverview();
    getDataProjOverview();
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

            setDataProjOverview();
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


function setDataProjOverview() {
    // checks to see if youre on the projects overview page with all the containers 
    // if you are then it will set the projects into localStorage 
    if (document.querySelector(".project-container")) {

        //clear out the local storage that is existing first
        localStorage.clear();

        //update localStorage with all the new projects
        const allProjsOverview = document.querySelectorAll(".project-container");
        allProjsOverview.forEach((projectContainer, index) => {
            const projectTitle = projectContainer.querySelector(".project-title").textContent;

            localStorage.setItem(`projTitle-${index}`, projectTitle);
        })
    } else {
        console.log("No overview projects found in page to store into localStorage");
        localStorage.clear(); //// clearing the remaining last item when removing 
    }
}


function getDataProjOverview() {
    // need to get the info stored in localStorage
    // push it into myProject [ ] using .push( ) to create {projTitle, projDesc} using constructor
    // the displayProject() should then read the myProjects entries to recreate the page 

    // find number of matching keys in local storage to know how many containers to create
    let count = 0;
    for (let i=0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`projTitle`)) {
            count++;
        }
    }

    let numMatchingKeys = count;

    // cant modify the array since it is only getter array but can modify it 
    // setting length to 0 essentially clears it 
    myProjects.length = 0;

    for (let j=0; j < numMatchingKeys; j++) {
        const retrievedProjTitle = localStorage.getItem(`projTitle-${j}`);
        let projObject = new Project(retrievedProjTitle, "");
        projObject.createProject();
        // so now i have created each of the objects from localStorage and pushed the projObject into the myProject array 
    }

}

// need to add the function to check if localStorage exists and if there is space etc 


export { projectsOverview, setDataProjOverview};