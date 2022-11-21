"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects, generateRandomTasks } from "./dev.utility";
//Storage 
//Unload all data into an object and store it in the localstorage
export function saveToLocalStorage(projects)
{
    if (!storageAvailable("localStorage")) return;

    const projectsToStore = [];

    projects.forEach(project => {

        const currentProjectData = {
            "title": null,
            "todo": [],
            "done": [],
        }

        currentProjectData["title"] = project.getTitle();

        project.getPendingTasks().forEach(task => {
            currentProjectData["todo"].push({
                "title": task.getTitle(),
                "details": task.getDetails(),
                "due": task.getDue(),
                "priority": task.getPriority(),
            })
        });

        project.getDoneTasks().forEach(task => {
            currentProjectData["done"].push({
                "title": task.getTitle(),
                "details": task.getDetails(),
                "due": task.getDue(),
            })
        });

        projectsToStore.push(currentProjectData);
    });

    localStorage.setItem("storedProjects", JSON.stringify(projectsToStore));
}

//projects are restored by recreating project objects using the saved parameters
export function loadFromLocalStorage()
{
    if (!storageAvailable("localStorage")) return;

    const projects = [];

    if (localStorage.getItem("storedProjects"))
    {
        const storageProjects = JSON.parse(localStorage.getItem("storedProjects"));

        storageProjects.forEach(project => {

            const currentProject = Project(project["title"]);

            project["todo"].forEach(task => {
                currentProject.addTask(
                    Task(task["title"],
                    task["details"],
                    task["due"],
                    task["priority"])
                )
            });

            project["done"].forEach(task => {
                currentProject.addDone(
                    Task(task["title"],
                    task["details"],
                    task["due"],
                    task["priority"])
                )
            });

            projects.push(currentProject);
        });
    }
    else
    {
        projects = generateRandomProjects(20);
        generateRandomTasks(projects, 10);
    }

    return projects;
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
};