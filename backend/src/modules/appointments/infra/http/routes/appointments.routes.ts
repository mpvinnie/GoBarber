import { AppointmentsRepository } from '@modules/appointments/repositories/AppointmentsRepository'
import { CreateAppointmentUseCase } from '@modules/appointments/useCases/createAppointment/CreateAppointmentUseCase'
import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const appointmentRoutes = Router()

appointmentRoutes.use(ensureAuthenticated)

appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentUseCase()

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.status(201).json(appointment)
})
