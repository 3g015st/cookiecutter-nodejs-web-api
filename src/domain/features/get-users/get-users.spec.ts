import { Test, TestingModule } from '@nestjs/testing'
import { GetUserUseCase } from './get-users.usecase'
import { InfrastructureModule } from '@root/infrastructure/infrastructure.module'
import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { DataSource, Repository } from 'typeorm'
import { User } from '@root/infrastructure/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from '@root/infrastructure/entities/todo.entity'

describe('GetUserUseCase - Unit Testing', () => {
  let backup: IBackup
  let service: GetUserUseCase
  let dataSource: DataSource
  let repository: Repository<User>

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
      entities: [User, Todo],
    })

    await dataSource.initialize()
    await dataSource.synchronize()

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

    service = module.get<GetUserUseCase>(GetUserUseCase)

    repository = dataSource.getRepository(User)
    backup = db.backup()
  })

  afterAll(async () => {
    await dataSource.close()
  })

  beforeEach(async () => {
    const johnDoeUser = repository.create({
      name: 'John Doe',
    })

    const janeDoeUser = repository.create({
      name: 'Jane Doe',
    })

    await repository.save(johnDoeUser)
    await repository.save(janeDoeUser)
  })

  afterEach(async () => {
    backup.restore()
  })

  it('Should return all users', async () => {
    const response = await service.execute({})
    expect(response.users.length).toBe(2)
  })

  it('Should return all user which user id is 2', async () => {
    const response = await service.execute({ userId: 2 })
    expect(response.users.length).toBe(1)
  })

  it('Should return all user that has a name, John Doe using case insensitive query name', async () => {
    const response = await service.execute({ name: 'John Doe'.toLowerCase() })
    expect(response.users.length).toBe(1)
    expect(response.users[0].name).toBe('John Doe')
  })
})
