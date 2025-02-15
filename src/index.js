import "./styles.css";
import { projectsOverview } from "./projectsOverview";
import { displayProjectPage, addItemsToProject, addDescriptionToItems, editDialog } from "./addItemsToProjects";

let myProjects = [];
const content = document.querySelector("div#content")

class ToDoItem {
    constructor(task, dueDate, priority) {
        this.task = task;
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

let project1 = new Project("Sample Project 1", "Description for Sample Project 1");
project1.createProject();

let project2 = new Project("Sample Project 2", "Description for Sample Project 2");
project2.createProject();

// document.addEventListener('DOMContentLoaded', projectsOverview()); // this loads up the overview homepage on connect

displayProjectPage(project1);
editDialog();
addItemsToProject();


export { content, ToDoItem, Project, myProjects };