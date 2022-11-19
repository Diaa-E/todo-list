"use strict";

export function addClasses(element, ...cssClasses)
{
    cssClasses.forEach(cssClass => {

        element.classList.add(cssClass);
    });
};

export function createDomElement(elementTag = "div")
{   
    return document.createElement(elementTag);
};

export function setElementAttributes(element, ...attributesAndValues)
{
    //each attribute is passed as a string followed by its value
    for (let i = 0; i < attributesAndValues.length ; i++)
    {
        element.setAttribute(attributesAndValues[i], attributesAndValues[++i]);
    }
};

export function setElementText(element, value)
{
    element.innerText = value;
};


export function removeClasses(element, ...cssClasses)
{
    cssClasses.forEach(cssClass => {

        element.classList.remove(cssClass);
    });
};