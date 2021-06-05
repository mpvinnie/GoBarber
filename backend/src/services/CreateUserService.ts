import { hash } from 'bcryptjs'
import { getRepository } from 'typeorm'

import { User } from '../models/User'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User)

    const findUser = await usersRepository.findOne({ email })

    if (findUser) {
      throw new Error('Email address already used')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)

    return user
  }
}
