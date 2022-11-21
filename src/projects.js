"use strict";

import { addToCollection, removeFromCollection } from "./utility";

export function Project(name)
{
    const todo = [];
    const done = [];
    let title
    const validNamePattern = /^[a-z](?:\s?[a-z0-9]+)*$/gi;

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

    const getPendingTasks = () => todo;
    const getDoneTasks = () => done;
    const getTitle = () => title;

    const setTitle = (newTitle) => {

        if (validNamePattern.test(newTitle))
        {
            title = newTitle;
        }
    };

    const addTask = (task) => {

        addToCollection(task, todo);
    };

    const completeTask = (task, taskIndex) => {

        addToCollection(task, done);
        removeFromCollection(taskIndex, todo);
    };

    //used only for loading from local storage
    const addDone = (task) => {
        addToCollection(task, done);
    }

    const removeTask = (taskIndex) => {

        removeFromCollection(taskIndex, todo);
    }

    return {
        getPendingTasks,
        getDoneTasks,
        getTitle,
        setTitle,
        addTask,
        completeTask,
        removeTask,
        addDone
    };
};