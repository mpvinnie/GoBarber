import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserUseCase)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    const serializedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    return response.status(201).json(serializedUser)
  }
}
