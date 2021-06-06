import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserUseCase)

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const serializedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    return response.status(201).json({ user: serializedUser, token })
  }
}
