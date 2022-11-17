"use strict"

export function updateProjects(projects, selectFirst = true)
{
    let currentProject = 0

    if (!selectFirst) currentProject = +document.querySelector(".projects-active").getAttribute("data-index");
    
    const parent = document.querySelector("#projects");
    parent.innerHTML = "";

    const listItems = []
    
    for (let i = 0; i < projects.length; i++)
    {
        listItems.push(createDomElement("li"));
        setElementAttributes(listItems[i], "data-index", `${i}`);
        setElementText(listItems[i], projects[i].getTitle());

        listItems[i].addEventListener("click", (e) => {

            selectProject(+e.target.getAttribute("data-index"));
        });
    }

    listItems.forEach(item => {

        parent.appendChild(item);
    });

    selectProject(currentProject);
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