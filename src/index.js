"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects, generateRandomTasks } from "./dev.utility";
import { screenController } from "./dom.utility";
import "./index.css";

const app = screenController();
app.initialize();