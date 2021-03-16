import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatarService: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png'
    })

    expect(user.avatar).toBe('avatar.png')
  })

  it('should not be able to update avatar from non existing user', async () => {
    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.png'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'new-avatar.png'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.png')
    expect(user.avatar).toBe('new-avatar.png')
  })
})
