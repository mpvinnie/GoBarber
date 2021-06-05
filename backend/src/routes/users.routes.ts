import { Router } from 'express'

import { CreateUserService } from '../services/CreateUserService'

export const userRoutes = Router()

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

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
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})
