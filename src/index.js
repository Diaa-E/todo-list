"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { updateProjects } from "./dom.utility";
import "./index.css";

const projects = [];

const project1 = Project("first_project");
const project2 = Project("second_project");

projects.push(project1);
projects.push(project2);

updateProjects(projects);

const task1 = Task("Add first task", "This is the first task in the project", "12/45/4546");
project1.addTask(task1);