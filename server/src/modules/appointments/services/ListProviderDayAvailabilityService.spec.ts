import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 2, 20, 12, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 2, 20, 14, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 20, 11).getTime()
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider_id',
      day: 20,
      year: 2021,
      month: 3
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true }
      ])
    )
  })
})
