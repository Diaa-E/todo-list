"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { removeFromCollection } from "./utility";
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

        const btnDeleteProject = document.querySelector("#delete-project");
        btnDeleteProject.addEventListener('click', () => {

            //At least 1 project must be present
            if (projects.length === 1) return;

            removeFromCollection(currentProjectIndex, projects);
            setCurrentProject(0);
            updateScreen();
        });

        const btnAddProject = document.querySelector("#add-project");
        btnAddProject.addEventListener("click", (e) => {

            promptForm(+e.target.getAttribute("data-mode"), "New Project");
        })

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
            setElementAttributes(divTask, "data-index", i)

            const currentTask = currentProject.getPendingTasks()[i];

            const btnComplete = createDomElement("button");
            setElementAttributes(btnComplete, "id", "complete-task");
            addClasses(btnComplete, "button-task");

            btnComplete.addEventListener("click", (e) => {

                const selectedTask = +e.target.parentNode.getAttribute("data-index")
                currentProject.completeTask(currentProject.getPendingTasks()[selectedTask], selectedTask);
                updateScreen();
            });

            const hTitle = createDomElement("h1");
            addClasses(hTitle, "task-title", "task-title-todo");
            setElementText(hTitle, currentTask.getTitle());

            const btnRemove = createDomElement("button");
            setElementAttributes(btnRemove, "id", "remove-task");
            addClasses(btnRemove, "button-task");

            btnRemove.addEventListener("click", (e) => {

                const selectedTask = +e.target.parentNode.getAttribute("data-index")
                currentProject.removeTask(selectedTask);
                updateScreen();
            });

            const btnEdit = createDomElement("button");
            setElementAttributes(btnEdit, "id", "edit-task");
            addClasses(btnEdit, "button-task");

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

    const promptForm = (mode, title = "action") =>{

        //mode 0 -> add new project
        //mode 1 -> add new task
        //mode 2 => edit task
        
        const formElements = [];
        const parent = createDomElement("div");
        setElementAttributes(parent, "id", "prompt");
        addClasses(parent, "prompt-background");

        const divCard = createDomElement("div");
        addClasses(divCard, "card");

        const formPrompt = createDomElement("form");
        addClasses(formPrompt, "prompt-form");
        setElementAttributes(formPrompt, "action", "");

        const legendAction = createDomElement("legend");
        setElementText(legendAction, title);
        formElements.push(legendAction);

        const lblTitle = createDomElement("label");
        setElementText(lblTitle, "Title");
        setElementAttributes(lblTitle, "for", "title");
        formElements.push(lblTitle);

        const txtTitle = createDomElement("input");
        setElementAttributes(txtTitle, "type", "text", "id", "title", "name", "title", "required", "");
        addClasses(txtTitle, "prompt-field");
        formElements.push(txtTitle);

        if (mode === 1 || mode === 2)
        {
            const lblDetails = createDomElement("label");
            setElementText(lblDetails, "Details");
            setElementAttributes(lblDetails, "for", "details");
            formElements.push(lblDetails);

            const areaDetails = createDomElement("textarea");
            setElementAttributes(areaDetails, "id", "details", "name", "details", "cols", "30", "rows", "10");
            addClasses(areaDetails, "prompt-field");
            formElements.push(areaDetails);

            const lblDate = createDomElement("label");
            setElementText(lblDate, "Due");
            setElementAttributes(lblDate, "for", "date");
            formElements.push(lblDate);

            const dateDue = createDomElement("input");
            setElementAttributes(dateDue, "type", "date", "id", "date", "name", "date", "required", "");
            addClasses(dateDue, "prompt-field");
            formElements.push(dateDue);
        };

        const divControls = createDomElement("div");
        addClasses(divControls, "prompt-controls");

        const btnCancel = createDomElement("button");
        addClasses(btnCancel, "button", "button-danger");
        setElementAttributes(btnCancel, "type", "button");
        const divCancel = createDomElement("div");
        addClasses(divCancel, "icon", "icon-button");
        setElementAttributes(divCancel, "id", "cancel");

        btnCancel.addEventListener("click", () => {

            closePrompt();
        });

        btnCancel.appendChild(divCancel);
        btnCancel.innerHTML += "Cancel"; //Avoid removing the appended div

        const btnSave = createDomElement("button");
        addClasses(btnSave, "button", "button-valid");
        setElementAttributes(btnSave, "type", "submit");
        const divSave = createDomElement("div");
        addClasses(divSave, "icon", "icon-button");
        setElementAttributes(divSave, "id", "save");

        btnSave.appendChild(divSave);
        btnSave.innerHTML += "Save";

        divControls.append(btnCancel, btnSave);
        formElements.push(divControls);

        formElements.forEach(element => {

            formPrompt.appendChild(element);
        })

        divCard.appendChild(formPrompt);
        parent.appendChild(divCard);

        document.body.appendChild(parent);
    };

    const closePrompt = () => {

        const body = document.querySelector("body");
        const divPrompt = document.querySelector("#prompt");
        body.removeChild(divPrompt);
    }

    return {initialize};
};