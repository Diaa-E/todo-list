"use strict";

import { addToCollection } from "./utility";

export function Project(name)
{
    const tasks = [];
    let title
    const validNamePattern = /^[a-z](?:_?[a-z0-9]+)*$/gi;

    //name must start with a letter
    //numbers and underscores are legal
    if (validNamePattern.test(name))
    {
        title = name;
    }
    else
    {
        title = "New Project"
    }

    const getTasks = () => tasks;
    const getTitle = () => title;

    const setTitle = (newTitle) => {

        if (validNamePattern.test(newTitle))
        {
            title = newTitle;
        }
    };

    const addTask = (task) => {

        addToCollection(task, tasks);
    };

    return {
        getTasks,
        getTitle,
        setTitle,
        addTask
    };
};