import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import { Appointment } from '../models/Appointment'
import { AppointmentsRepository } from '../repositories/AppointmentsRepository'

interface IRequest {
  provider_id: string
  date: Date
}

export class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
