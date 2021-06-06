import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import { ensureAutenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

export const userRoutes = Router()

const upload = multer(uploadConfig)

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

userRoutes.patch(
  '/avatar',
  ensureAutenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      const serializedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }

      return response.json({ user: serializedUser })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
)
