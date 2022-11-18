"use strict";

export function updateScreen(projects, selectFirst = true)
{
    let currentProjectIndex = 0;

    if (!selectFirst) currentProjectIndex = +document.querySelector(".projects-active").getAttribute("data-index");
    
    const parent = document.querySelector("#projects");
    parent.innerHTML = "";

    const listItems = [];
    
    for (let i = 0; i < projects.length; i++)
    {
        listItems.push(createDomElement("li"));
        setElementAttributes(listItems[i], "data-index", `${i}`);
        setElementText(listItems[i], projects[i].getTitle());

        listItems[i].addEventListener("click", (e) => {

            selectProject(+e.target.getAttribute("data-index"));
            updateProjectTitle(projects[+e.target.getAttribute("data-index")].getTitle());
            updateTasks(projects[+e.target.getAttribute("data-index")])
        });
    }

    listItems.forEach(item => {

        parent.appendChild(item);
    });

    selectProject(currentProjectIndex, projects[currentProjectIndex].getTitle());
    updateProjectTitle(projects[currentProjectIndex].getTitle());
    updateTasks(projects[currentProjectIndex]);
}

function selectProject(projectIndex)
{
    //the class added to selected item
    const selectedClass = "projects-active";

    const projectsList = document.querySelectorAll("#projects li");

    //remove selection from all items
    projectsList.forEach(project => {
        project.classList.remove(selectedClass);
    });

    //add selection to current item
    projectsList[projectIndex].classList.add(selectedClass);
}

function createDomElement(elementTag = "div")
{   
    return document.createElement(elementTag);
}

function setElementAttributes(element, ...attributesAndValues)
{
    //each attribute is passed as a string followed by its value
    for (let i = 0; i < attributesAndValues.length ; i++)
    {
        element.setAttribute(attributesAndValues[i], attributesAndValues[++i]);
    }
}

function setElementText(element, value)
{
    element.innerText = value;
}

function updateProjectTitle(newTitle)
{
    setElementText(document.querySelector("#project-title"), newTitle);
}

function addClasses(element, ...cssClasses)
{
    cssClasses.forEach(cssClass => {

        element.classList.add(cssClass);
    });
}

function updateTasks(project)
{
    const parent = document.querySelector("#todo");
    parent.innerHTML = "";

    for (let i = 0; i < project.getPendingTasks().length; i++)
    {
        const divTask = createDomElement("div");
        addClasses(divTask, "task", "task-todo");

        const btnComplete = createDomElement("button");
        setElementAttributes(btnComplete, "id", "complete-task");
        addClasses(btnComplete, "button-task");
        setElementAttributes(btnComplete, "data-index", `${i}`);

        const hTitle = createDomElement("h1");
        addClasses(hTitle, "task-title", "task-title-todo");
        setElementText(hTitle, project.getPendingTasks()[i].getTitle());

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
        setElementText(pDetails, project.getPendingTasks()[i].getDetails());

        const hDate = createDomElement("h1");
        addClasses(hDate, "task-date", "task-date-todo");
        setElementText(hDate, project.getPendingTasks()[i].getDue());

        divTask.append(
            btnComplete,
            hTitle,
            btnRemove,
            btnEdit,
            pDetails,
            hDate)

        parent.appendChild(divTask);
    }
}