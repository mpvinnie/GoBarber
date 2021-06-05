import 'reflect-metadata'
import express from 'express'

import './database'
import { appRoutes } from './routes'

const app = express()

app.use(express.json())

app.use(appRoutes)

app.listen(3333, () => {
  console.log('💈 Server is running on port 3333!')
})
