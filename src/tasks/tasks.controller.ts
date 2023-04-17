import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { Status } from '../enums/status.enum';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      let allTasks: Task[] =
        await AppDataSource.getRepository(Task).find({
          order: { date: 'ASC' },
        });

      allTasks = <Task[]>instanceToPlain(allTasks);

      return res.json(allTasks).status(200);
      console.log(allTasks);
    } catch (err) {
      console.error(err);
      return res
        .json({ error: 'Internal Serevr Error' })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    } else {
      //Create a new instance of the Task
      const newTask = new Task();
      const {
        id,
        title,
        description,
        date,
        priority,
        status,
      } = req.body;

      newTask.id = id;
      newTask.title = title;
      newTask.description = description;
      newTask.date = date;
      newTask.priority = priority;
      newTask.status = status;

      let createdTask: Task;

      try {
        createdTask = await AppDataSource.getRepository(
          Task,
        ).save(newTask);
        return res.status(200).json(createdTask);
      } catch (err) {
        return res
          .status(500)
          .json('failed to create task');
      }
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    //errors case
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(500).json(errors);
    else {
      let taskToUpdate: Task | null;
      taskToUpdate = await AppDataSource.getRepository(
        Task,
      ).findOneBy({
        id: req.body.id,
      });
      if (taskToUpdate == null)
        return res.status(404).json("can't find task");
      taskToUpdate.status = req.body.status;
      let updatedTask: UpdateResult;

      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(req.body.id, taskToUpdate);

      return res.status(200).json({ updatedTask });
    }

    return res
      .status(201)
      .json('updated task succesfullyd');

    console.log('qaqaah');
  }
}

export const tasksController = new TasksController();
