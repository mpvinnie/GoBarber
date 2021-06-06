import { appointmentRoutes } from '@modules/appointments/infra/http/routes/appointments.routes'
import { sessionRoutes } from '@modules/users/infra/http/routes/sessions.routes'
import { userRoutes } from '@modules/users/infra/http/routes/users.routes'
import { Router } from 'express'

export const appRoutes = Router()

appRoutes.use('/appointments', appointmentRoutes)
appRoutes.use('/users', userRoutes)
appRoutes.use('/sessions', sessionRoutes)
