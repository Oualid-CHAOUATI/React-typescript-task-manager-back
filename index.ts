// import
import express, {
  Express,
  Request,
  Response,
} from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';
dotenv.config();
//instatiate

//create database connection

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  entities: [Task],
});

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

// create a port

//create a route

app.get('/', (req: Request, res: Response, next) => {
  res.send('<h1>It worked !! <br/> iiih !</h1>');
});

app.use('/', taskRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT);
    console.log('data source has been initialized');
  })
  .catch((err) => {
    console.error(
      'error when initilizing data source ',
      err,
    );
  });
