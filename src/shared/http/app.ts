import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes/index'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/uploads'

import '@shared/typeorm'

const port = 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)


app.use(errors())

/**
 * Middleware AppError that return a json response to user.
 */
app.use((error: Error, request: Request, response:Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})
/**
 * Listen that returns a message on what port the server is running.
 */
app.listen(port, () => console.log('Running on Port: ' + port));
