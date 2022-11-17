"use strict"

export function updateProjects(projects)
{
    const ulProjects = document.querySelector("#projects");
    ulProjects.innerHTML = "";

    const listItems = createProjectElements(projects, "li");

    listItems.forEach(item => {

        ulProjects.appendChild(item);
    });
}

function createProjectElements(projects, typeOfElements)
{
    const elementsList = [];

    for (let i = 0; i < projects.length; i++)
    {
        elementsList.push(document.createElement(typeOfElements));
        elementsList[i].setAttribute("data-index", `${i}`);
        elementsList[i].innerText = projects[i].getTitle();
    };

    return elementsList;
}