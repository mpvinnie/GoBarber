import { Router } from 'express'

import { AuthenticateUserService } from '../services/AuthenticateUserService'

export const sessionRoutes = Router()

sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService()

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
