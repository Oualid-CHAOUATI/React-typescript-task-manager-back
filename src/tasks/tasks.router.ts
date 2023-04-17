import { Router, Request, Response } from 'express';
import { tasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import {
  createValidator,
  updateValidator,
} from './tasks.validator';

import { validationResult } from 'express-validator/src/validation-result';
export const taskRouter: Router = Router();

taskRouter.get('/tasks', tasksController.getAll);

taskRouter.post(
  '/tasks',
  createValidator,
  tasksController.create,
);

taskRouter.put(
  '/tasks',
  updateValidator,
  tasksController.update,
);
