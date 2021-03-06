import { Router } from 'express'
import multer from 'multer'

import UsersController from '../controllers/UsersController'
import UsersAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'
import { celebrate, Joi, Segments } from 'celebrate'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UsersAvatarController()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
