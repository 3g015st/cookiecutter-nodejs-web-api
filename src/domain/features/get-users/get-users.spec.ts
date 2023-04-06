import { Test, TestingModule } from '@nestjs/testing'
import { GetUserUseCase } from './get-users.usecase'
import { InfrastructureModule } from '@root/infrastructure/infrastructure.module'
import { newDb } from 'pg-mem'
import { DataSource } from 'typeorm'
import { User } from '@root/infrastructure/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('GetUserUseCase - Unit Testing', () => {
  let service: GetUserUseCase
  let dataSource: DataSource

  beforeAll(async () => {
    const db = newDb({
      autoCreateForeignKeyIndices: true,
    })

    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    })

    db.public.registerFunction({
      name: 'version',
      implementation: () => 'test',
    })

    dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [User],
    })

    await dataSource.initialize()
    await dataSource.synchronize()
  })

  afterAll(async () => {
    await dataSource.close()
  })

  beforeEach(async () => {
    const userRepository = dataSource.getRepository(User)
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'default',
          synchronize: true,
        }),
        InfrastructureModule,
      ],
      providers: [GetUserUseCase],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile()

    const johnDoeUser = userRepository.create({
      name: 'John Doe',
    })

    const janeDoeUser = userRepository.create({
      name: 'Jane Doe',
    })

    await userRepository.save(johnDoeUser)
    await userRepository.save(janeDoeUser)

    service = module.get<GetUserUseCase>(GetUserUseCase)
  })

  it('Should return all users', async () => {
    const response = await service.execute({})
    expect(response.users.length).toBe(2)
  })

  it('Should return all user which user id is 2', async () => {
    const response = await service.execute({ userId: 2 })
    expect(response.users.length).toBe(1)
  })
})
