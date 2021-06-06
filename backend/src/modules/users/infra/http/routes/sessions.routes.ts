import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'
import { Router } from 'express'

const authenticateUserController = new AuthenticateUserController()

export const sessionRoutes = Router()

sessionRoutes.post('/', authenticateUserController.handle)
