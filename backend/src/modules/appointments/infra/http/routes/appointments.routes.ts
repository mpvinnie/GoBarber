import { CreateAppointmentUseCase } from '@modules/appointments/useCases/createAppointment/CreateAppointmentUseCase'
import { parseISO } from 'date-fns'
import { Router } from 'express'
import { container } from 'tsyringe'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const appointmentRoutes = Router()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = container.resolve(CreateAppointmentUseCase)

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.status(201).json(appointment)
})
