import { Router } from 'express'

import { appointmentRoutes } from './appointments.routes'
import { userRoutes } from './users.routes'

export const appRoutes = Router()

appRoutes.use('/appointments', appointmentRoutes)
appRoutes.use('/users', userRoutes)
