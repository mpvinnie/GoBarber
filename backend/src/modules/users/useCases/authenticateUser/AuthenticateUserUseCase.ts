import authConfig from '@config/auth'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class AuthenticateUserUseCase {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}
