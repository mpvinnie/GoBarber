import { EntityRepository, Repository } from 'typeorm'

import { Appointment } from '../models/Appointment'

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({ date })

    return findAppointment
  }
}
