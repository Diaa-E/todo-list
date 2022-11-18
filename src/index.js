"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects, generateRandomTasks } from "./dev.utility";
import { updateScreen } from "./dom.utility";
import "./index.css";

const projects = generateRandomProjects(20);

generateRandomTasks(projects, 10);
updateScreen(projects);