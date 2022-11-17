"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects } from "./dev.utility";
import { updateProjects } from "./dom.utility";
import "./index.css";

const projects = generateRandomProjects(20);

updateProjects(projects);