"use strict"

import { Project } from "./projects";
import { Task } from "./tasks";

//for development
function generateRandomText(maxLength)
{
    let textString = "";
    const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < maxLength; i++)
    {
        const randomIndex = Math.floor(Math.random() * (characterSet.length-1));
        textString += characterSet.charAt(randomIndex);
    }

    return textString;
}

export function generateRandomProjects(maxProjects)
{
    const newProjects = [];

    for(let i = 0; i < Math.ceil(Math.random() * maxProjects); i++)
    {
        newProjects.push(Project(generateRandomText(10)));
    }

    return newProjects;
}

export function generateRandomTasks(projects, maxTasks)
{
    const newTasks = [];

    for (let j = 0; j < projects.length; j++)
    {    
        for (let i = 0; i < Math.ceil(Math.random() * maxTasks); i++)
        {
            projects[j].addTask((Task(generateRandomText(10), generateRandomText(20), generateRandomText(10), 2)));
        }
    }
}