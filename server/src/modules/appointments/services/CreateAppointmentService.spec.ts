import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 31, 9).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 9, 31, 10),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider_id')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 9, 31, 10)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 31, 9).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 31, 8),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 31, 10).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 31, 14),
        user_id: 'user_id',
        provider_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 31, 10).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 31, 20),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 1, 7),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
