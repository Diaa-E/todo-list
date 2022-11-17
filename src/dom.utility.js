"use strict"

export function updateProjects(projects)
{
    const parent = document.querySelector("#projects");
    parent.innerHTML = "";

    const listItems = createProjectsList(projects, "li");

    listItems.forEach(item => {

        parent.appendChild(item);
    });
}

function createProjectsList(projects, typeOfElements)
{
    const elementsList = [];

    for (let i = 0; i < projects.length; i++)
    {
        elementsList.push(document.createElement(typeOfElements));
        elementsList[i].setAttribute("data-index", `${i}`);
        elementsList[i].innerText = projects[i].getTitle();

        elementsList[i].addEventListener("click", (e) => {
            selectProject(+e.target.getAttribute("data-index"));
        });
    };

    return elementsList;
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