import 'reflect-metadata'
import express from 'express'

import './database'

import uploadConfig from './config/upload'
import { appRoutes } from './routes'

const app = express()

app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))
app.use(appRoutes)

app.listen(3333, () => {
  console.log('💈 Server is running on port 3333!')
})
