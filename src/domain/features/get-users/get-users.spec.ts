import { Test, TestingModule } from '@nestjs/testing'
import { GetUserUseCase } from './get-users.usecase'

describe('GetUserUseCase - Unit Testing', () => {
  let service: GetUserUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserUseCase],
      imports: [],
    }).compile()

    service = module.get<GetUserUseCase>(GetUserUseCase)
  })

  it('Should return all users', () => {
    const response = service.execute({})
    expect(response.users.length).toBe(2)
  })

  it('Should return all user which user id is 2', () => {
    const response = service.execute({ userId: 2 })
    expect(response.users.length).toBe(1)
  })
})
