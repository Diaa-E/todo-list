"use strict"

import { Project } from "./projects";
import { Task } from "./tasks";
import {format} from "date-fns";

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
    for (let j = 0; j < projects.length; j++)
    {    
        for (let i = 0; i < Math.ceil(Math.random() * maxTasks); i++)
        {
            projects[j].addTask((
                Task(generateRandomText(10), 
                generateRandomText(20), 
                generateRandomDate(), 
                Math.round(Math.random()*2))));
        }

        projects[j].completeTask(projects[j].getPendingTasks()[0], 0);
    }
}

function generateRandomDate()
{
    const day = Math.floor(Math.random() * 25);
    const month = Math.floor(Math.random() * 11);
    const year = Math.floor(Math.random() * 10 + 2022);
    let date = format(new Date(year, month, day), 'yyyy-MM-dd');

    return date;
}