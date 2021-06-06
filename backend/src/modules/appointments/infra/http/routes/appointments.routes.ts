import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import { CreateAppointmentUseCase } from '@modules/appointments/useCases/createAppointment/CreateAppointmentUseCase'
import { parseISO } from 'date-fns'
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const appointmentRoutes = Router()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const appointmentsRepository = new AppointmentsRepository()

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentUseCase(appointmentsRepository)

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.status(201).json(appointment)
})
