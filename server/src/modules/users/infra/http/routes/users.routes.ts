import { Router } from 'express'
import multer from 'multer'

import UsersController from '../controllers/UsersController'
import UsersAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UsersAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
