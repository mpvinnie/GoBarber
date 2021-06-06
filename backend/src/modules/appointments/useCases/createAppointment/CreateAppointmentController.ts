import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAppointmentUseCase } from './CreateAppointmentUseCase'

export class CreateAppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentUseCase)

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate
    })

    return response.status(201).json(appointment)
  }
}
