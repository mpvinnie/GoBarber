import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO'
import { Appointment } from '../infra/typeorm/entities/Appointment'

export interface IAppointmentsRepository {
  create: (data: ICreateAppointmentDTO) => Promise<Appointment>
  findByDate: (date: Date) => Promise<Appointment | undefined>
}
