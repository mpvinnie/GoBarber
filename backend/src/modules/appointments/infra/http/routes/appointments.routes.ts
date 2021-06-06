import { CreateAppointmentController } from '@modules/appointments/useCases/createAppointment/CreateAppointmentController'
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const appointmentRoutes = Router()

const createAppointmentController = new CreateAppointmentController()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.post('/', createAppointmentController.handle)
