import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { startOfHour } from 'date-fns'

import { AppError } from '@shared/errors/AppError'

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}
