"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { updateProjects } from "./dom.utility";
import "./index.css";
import { generateRandomProjects } from "./dev.utility";

const projects = generateRandomProjects(20);

updateProjects(projects);