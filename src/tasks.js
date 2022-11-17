"use strict";

export function Task(taskTitle, taskDetails, taskDueDate, taskPriority = 0)
{
    let title;
    const details = taskDetails;
    const due = taskDueDate;
    const priority = taskPriority;
    const validNamePattern = /^[a-z](?:\s?[a-z0-9]+)*$/gi;

    if (validNamePattern.test(taskTitle))
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
        if (validNamePattern.test(taskTitle))
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