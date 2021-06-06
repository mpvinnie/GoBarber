import 'reflect-metadata'
import uploadConfig from '@config/upload'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import '@shared/infra/typeorm'

import { AppError } from '@shared/errors/AppError'
import { appRoutes } from '@shared/infra/http/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(appRoutes)

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => {
  console.log('💈 Server is running on port 3333!')
})
