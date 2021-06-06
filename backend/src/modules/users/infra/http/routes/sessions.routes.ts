import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase'
import { Router } from 'express'

import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

export const sessionRoutes = Router()

sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body

  const usersRepository = new UsersRepository()

  const authenticateUser = new AuthenticateUserUseCase(usersRepository)

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
})
