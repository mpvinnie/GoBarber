import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const updateUserAvatarController = new UpdateUserAvatarController()

const createUserController = new CreateUserController()

export const userRoutes = Router()

const upload = multer(uploadConfig)

userRoutes.post('/', createUserController.handle)

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle
)
