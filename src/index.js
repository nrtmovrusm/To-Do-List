import "./styles.css";
<<<<<<< HEAD
import { displayProjectsOverview } from "./projectsOverview";

let myProjects = [];

class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
=======
import { projectsOverview, setDataProjOverview } from "./projectsOverview";
import { displayProjectPage, addItemsToProject, editDialog, sortContainer, storeToDoList, getToDoList } from "./addItemsToProjects";

let myProjects = [];
const content = document.querySelector("div#content")

class ToDoItem {
    constructor(task, dueDate, priority) {
        this.task = task;
>>>>>>> addProjectBug
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    constructor(projectTitle, projectDescription) {
        this.projectTitle = projectTitle;
        this.projectDescription = projectDescription;
    }

    createProject() {
        myProjects.push(this);
    }
}

<<<<<<< HEAD
// item and project are instances of class ToDoItem and Project
function addItemToProject(item, project) {
    if (!project.toDoList) {
        project.toDoList = [];
    }

    project.toDoList.push(item);
}

document.addEventListener('DOMContentLoaded', displayProjectsOverview());

export { Project, myProjects };
=======
let project1 = new Project("project1", "Description for Sample Project 1");
project1.createProject();

let project2 = new Project("project2", "Description for Sample Project 2");
project2.createProject();

// 1) initial projects overview page is the home page 
document.addEventListener('DOMContentLoaded', projectsOverview()); // this loads up the overview homepage on connect

// 2) clicking projects overview button pulls up the projects overview page 
const projectsOverviewBtn = document.querySelector(".projects-overview-btn");
// projectsOverviewBtn.addEventListener("click", projectsOverview);

projectsOverviewBtn.addEventListener("click", () => {
    
    if (document.querySelector(".projects-container")) { //if you are on the projects overview page 
        setDataProjOverview();
    } else {    // if on a specific project to do list page and not on the overview page 
        // navigate to the projects overview page via function 
        console.log(`should store to do list`);
        // storeToDoList(); 
        projectsOverview(); // this projects overview wipes out my other to do list on specific pages
        // due to the localStorage.clear function

    }
    
})


// // 3) this will move to the specific projects with each button that is clicked 
// displayProjectPage(project1);
// editDialog(); //// may be able to just always have the editDialog running in background
// addItemsToProject();

//TO DO LIST:

///// add API local storage for the app
/////// fix up the to do list page to have local storage options 
///// add option where when you leave pages the DOM will save into local storage 
////// add the thing where when DOM loads it will load from your local storage 
//// make things pretty! 


export { content, ToDoItem, Project, myProjects, project1, project2 };
>>>>>>> addProjectBug
