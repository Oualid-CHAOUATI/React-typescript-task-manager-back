import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority.enum';
import { Status } from '../enums/status.enum';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('the task title is required')
    .trim()
    .isString()
    .withMessage('title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('the task date is required')
    .isString()
    .withMessage(
      'the date needs to be a valid  date format',
    ),
  body('description')
    .trim()
    .isString()
    .withMessage('description needs to be in ext format'),
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.normal, Priority.high])
    .withMessage(
      'priority must be either low or normal or high',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'status must be either todo, in progress or completed or completed',
    ),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('the id must be a string'),

  body('status')
    .not()
    .isEmpty()
    .withMessage('must inform a status')
    .trim()
    .isString()
    .withMessage('status must be a string')
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      ' status must be ONE of the following values (todo, in Progress,completed,)',
    ),
];
// Priority;
