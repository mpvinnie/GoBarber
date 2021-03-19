import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let fakeCacheProvider: FakeCacheProvider
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 18, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 2, 18, 13),
      user_id: '123456',
      provider_id: '123123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 2, 20, 11)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '123123'
    })

    await expect(
      createAppointment.execute({
        user_id: '123456',
        date: appointmentDate,
        provider_id: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 18, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 18, 10),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to crate on appointment with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 18, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 18, 14),
        user_id: 'user_id',
        provider_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to crate on appointment out of range of 8h and 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 18, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 19, 7),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 19, 18),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
