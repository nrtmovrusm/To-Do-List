import "./styles.css";
import { displayProjectsOverview } from "./projectsOverview";

let myProjects = [];

class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
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

// item and project are instances of class ToDoItem and Project
function addItemToProject(item, project) {
    if (!project.toDoList) {
        project.toDoList = [];
    }

    project.toDoList.push(item);
}

document.addEventListener('DOMContentLoaded', displayProjectsOverview());

export { Project, myProjects };