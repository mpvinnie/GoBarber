import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import { ensureAutenticated } from '../middlewares/ensureAuthenticated'
import { AppointmentsRepository } from '../repositories/AppointmentsRepository'
import { CreateAppointmentService } from '../services/CreateAppointmentService'

export const appointmentRoutes = Router()

appointmentRoutes.use(ensureAutenticated)

appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate
    })

    return response.status(201).json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})
