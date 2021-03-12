import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, '8e1d3b34fd7683c621315c3f7222a718', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user, token }
  }
}

export default AuthenticateUserService
