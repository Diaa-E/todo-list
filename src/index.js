"use strict";

function Project(name)
{
    const tasks = [];
    let title

    //name must start with a letter
    //numbers and underscores are legal
    if (/[a-z][a-z0-9\_]+/gi.test(name))
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

        if (/[a-z][a-z0-9\_]+/gi.test(newTitle))
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

function Task(taskTitle, taskDetails, taskDueDate, taskPriority = 0)
{
    let title;
    const details = taskDetails;
    const due = taskDueDate;
    const priority = taskPriority;

    if (/[a-z][a-z0-9\_]+/gi.test(taskTitle))
    {
        title = taskTitle;
    }
    else
    {
        title = "New Task";
    }

    const getTitle = () => title;
    const getDetails = () => details;
    const getDue = () => due;
    const getPriority = () => priority;

    const setPriority = (newPriority) =>{
        priority = newPriority;
    };

    const setTitle = (newTitle) => {
        if (/[a-z][a-z0-9\_]+/gi.test(taskTitle))
        {
            title = newTitle;
        }
    };

    const setDetails = (newDetails) => {
        details = newDetails;
    }

    const setDue = (newDue) => {
        due = newDue;
    }

    return {
        getTitle, 
        getDue, 
        getDetails,
        getPriority,
        setTitle,
        setDetails,
        setDue,
        setPriority
    };
};

//add an item to a given array
function addToCollection(item, collection)
{
    collection.push(item);
};

