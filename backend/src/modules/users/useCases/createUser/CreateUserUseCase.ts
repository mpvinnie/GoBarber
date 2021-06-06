import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { hash } from 'bcryptjs'

import { AppError } from '@shared/errors/AppError'

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email)

    if (findUser) {
      throw new AppError('Email address already used')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}
