"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects, generateRandomTasks} from "./dev.utility";
import {
    removeClasses,
    addClasses, 
    setElementAttributes, 
    setElementText, 
    createDomElement,
} from "./dom.utility";

export function screenController()
{
    let projects = [];

    let currentProjectIndex;
    let currentProject;

    const initialize = () => {

        projects = generateRandomProjects(20);
        generateRandomTasks(projects, 10);

        currentProjectIndex = 0;
        currentProject = projects[currentProjectIndex];

        updateScreen();
    };

    const setCurrentProject = (newProjectIndex) => {

        currentProjectIndex = newProjectIndex;
        currentProject = projects[currentProjectIndex];
    };

    const updateScreen = () => {

        const parent = document.querySelector("#projects");
        parent.innerHTML = "";

        const liProjects = [];
        
        for (let i = 0; i < projects.length; i++)
        {
            liProjects.push(createDomElement("li"));
            setElementAttributes(liProjects[i], "data-index", `${i}`);
            setElementText(liProjects[i], projects[i].getTitle());

            liProjects[i].addEventListener("click", (e) => {

                setCurrentProject(+e.target.getAttribute("data-index"));

                selectProject();
                updateProjectTitle();
                updateTodo();
                updateDone();
            });
        }

        liProjects.forEach(item => {

            parent.appendChild(item);
        });

        selectProject();
        updateProjectTitle();
        updateTodo();
        updateDone();
    };

    const selectProject = () => {

        //the class added to selected item
        const selectedClass = "projects-active";

        const projectsList = document.querySelectorAll("#projects li");

        //remove selection from all items
        projectsList.forEach(project => {
            removeClasses(project, selectedClass);
        });

        //add selection to current item
        addClasses(projectsList[currentProjectIndex], selectedClass)
    };

    const updateProjectTitle = () =>{

        setElementText(document.querySelector("#project-title"), currentProject.getTitle());
    };

    const updateTodo = () => {

        const parent = document.querySelector("#todo");
        parent.innerHTML = "";

        for (let i = 0; i < currentProject.getPendingTasks().length; i++)
        {
            const divTask = createDomElement("div");
            addClasses(divTask, "task", "task-todo");

            const currentTask = currentProject.getPendingTasks()[i];

            const btnComplete = createDomElement("button");
            setElementAttributes(btnComplete, "id", "complete-task");
            addClasses(btnComplete, "button-task");
            setElementAttributes(btnComplete, "data-index", `${i}`);

            const hTitle = createDomElement("h1");
            addClasses(hTitle, "task-title", "task-title-todo");
            setElementText(hTitle, currentTask.getTitle());

            const btnRemove = createDomElement("button");
            setElementAttributes(btnRemove, "id", "remove-task");
            addClasses(btnRemove, "button-task");
            setElementAttributes(btnRemove, "data-index", `${i}`);

            const btnEdit = createDomElement("button");
            setElementAttributes(btnEdit, "id", "edit-task");
            addClasses(btnEdit, "button-task");
            setElementAttributes(btnEdit, "data-index", `${i}`);

            const pDetails = createDomElement("p");
            addClasses(pDetails, "task-details", "task-details-todo");
            setElementText(pDetails, currentTask.getDetails());

            const hDate = createDomElement("h1");
            addClasses(hDate, "task-date", "task-date-todo");
            setElementText(hDate, currentTask.getDue());

            divTask.append(
                btnComplete,
                hTitle,
                btnRemove,
                btnEdit,
                pDetails,
                hDate)

            parent.appendChild(divTask);
        };
    };

    const updateDone = () => {

        const parent = document.querySelector("#done");
        parent.innerHTML = "";

        for (let i = 0; i < currentProject.getDoneTasks().length; i++)
        {
            const divTask = createDomElement("div");
            addClasses(divTask, "task", "task-done");

            const currentTask = currentProject.getDoneTasks()[i];

            const hTitle = createDomElement("h1");
            addClasses(hTitle, "task-title", "task-title-done");
            setElementText(hTitle, currentTask.getTitle());

            //using a div instead of img eliminates the hassle 
            //of dealing with src and importing images
            const divDone = createDomElement("div");
            addClasses(divDone, "icon");
            setElementAttributes(divDone, "id", "tick");

            const pDetails = createDomElement("p");
            addClasses(pDetails, "task-details", "task-details-done");
            setElementText(pDetails, currentTask.getDetails());

            const hDate = createDomElement("h1");
            addClasses(hDate, "task-date", "task-date-done");
            setElementText(hDate, currentTask.getDue());

            divTask.append(
                hTitle,
                divDone,
                pDetails,
                hDate)

            parent.appendChild(divTask);
        };
    }

    return {initialize};
};