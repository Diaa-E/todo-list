"use strict";

import { Project } from "./projects";
import { Task } from "./tasks";
import { generateRandomProjects, generateRandomTasks } from "./dev.utility";
import { screenController } from "./screen.controller";
import "./index.css";

const app = screenController();
app.initialize();