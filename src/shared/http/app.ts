import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { errors } from 'celebrate';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/uploads';
import rateLimiter from '@shared/http/middlewares/rateLimiter';

import '@shared/typeorm';

const app = express();

const PORT = 50000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

/**
 * Middleware AppError that return a json response to user.
 */
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
/**
 * Listen that returns a message on what port the server is running.
 */
app.listen(PORT, HOST, () =>
  console.log('Lets code, we can do it.🏆  🚀' + PORT),
);
