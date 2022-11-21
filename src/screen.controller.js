"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { removeFromCollection } from "./utility";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";
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

        projects = loadFromLocalStorage();
        
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
        });

        const btnAddTask = document.querySelector("#new-task");
        btnAddTask.addEventListener("click", (e) => {

            promptForm(+e.target.getAttribute("data-mode"), "New Task");
        });

        updateScreen();
        saveToLocalStorage(projects);
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
        saveToLocalStorage(projects);
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

            if (currentTask.getPriority() === 2) addClasses(divTask, "task-high");
            if (currentTask.getPriority() === 1) addClasses(divTask, "task-medium");
            if (currentTask.getPriority() === 0) addClasses(divTask, "task-low");

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
            setElementAttributes(btnEdit, "id", "edit-task", "data-mode", "2");
            addClasses(btnEdit, "button-task");

            btnEdit.addEventListener("click", (e) => {

                const taskIndex = +e.target.parentNode.getAttribute("data-index");
                promptForm(+e.target.getAttribute("data-mode"), "Edit Task", taskIndex);
                const formEdit = document.forms["prompt-form"];
                formEdit.elements["title"].value = currentProject.getPendingTasks()[taskIndex].getTitle();
                formEdit.elements["details"].value = currentProject.getPendingTasks()[taskIndex].getDetails();
                formEdit.elements["date"].value = currentProject.getPendingTasks()[taskIndex].getDue();
                formEdit.elements["priority"].value = currentProject.getPendingTasks()[taskIndex].getPriority();
            });

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
        saveToLocalStorage(projects);
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
        saveToLocalStorage(projects);
    }

    const promptForm = (mode, title = "action", taskIndex = null) =>{

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
        setElementAttributes(formPrompt, "action", "", "id", "prompt-form");

        formPrompt.addEventListener("submit", (e) => {

            e.preventDefault();
            const taskForm = document.forms["prompt-form"];
            //get form element contents
            switch (mode) {

                case 0:
                    const newProjectTitle = taskForm.elements["title"].value;
                    createProject(newProjectTitle);
                    break;

                case 1: 
                    const newTaskTitle = taskForm.elements["title"].value;
                    const newTaskDetails = taskForm.elements["details"].value;
                    const newTaskDue = taskForm.elements["date"].value;
                    const newTaskPriority = +taskForm.elements["priority"].value;
                    createTask(newTaskTitle, newTaskDetails, newTaskDue, newTaskPriority);
                    break;

                case 2:
                    const editedTaskTitle = taskForm.elements["title"].value;
                    const editedTaskDetails = taskForm.elements["details"].value;
                    const editedTaskDue = taskForm.elements["date"].value;
                    const editedTaskPriority = +taskForm.elements["priority"].value;
                    editTask(taskIndex, editedTaskTitle, editedTaskDetails, editedTaskDue, editedTaskPriority);
                    break;

            }
            
            closePrompt();
        });

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

            const lblPriority = createDomElement("label");
            setElementText(lblPriority, "Priority");
            setElementAttributes(lblPriority, "for", "priority");
            formElements.push(lblPriority);

            const rangePriority = createDomElement("input");
            setElementAttributes(rangePriority, "id", "priority", "type", "range",
            "name", "priority", "min", "0", "max", "2", "step", "1", "value", "0");
            formElements.push(rangePriority);

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
    };

    const createProject = (title) =>{

        projects.push(Project(title));
        updateScreen();
    };

    const createTask = (title, details = "", due, priority) => {

        currentProject.addTask(Task(title, details, due, priority));
        updateTodo();
    };

    const editTask = (taskIndex, newTitle, newDetails = "", newDue, newPriority) =>{

        const currentTask =  currentProject.getPendingTasks()[taskIndex];
        currentTask.setTitle(newTitle);
        currentTask.setDetails(newDetails);
        currentTask.setDue(newDue);
        currentTask.setPriority(newPriority);
        updateTodo();
    }

    return {initialize};
};