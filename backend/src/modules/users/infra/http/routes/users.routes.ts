import uploadConfig from '@config/upload'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { UpdateUserAvatarUseCase } from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarUseCase'
import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const userRoutes = Router()

const upload = multer(uploadConfig)

userRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserUseCase()

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
})

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarUseCase()

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
  }
)
