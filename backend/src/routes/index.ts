import { Router } from 'express'

import { appointmentRoutes } from './appointments.routes'

export const appRoutes = Router()

appRoutes.use('/appointments', appointmentRoutes)
