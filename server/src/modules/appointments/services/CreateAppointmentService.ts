import { startOfHour, isBefore } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {
    /**/
  }

  public async execute({
    provider_id,
    user_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment on a past date')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
