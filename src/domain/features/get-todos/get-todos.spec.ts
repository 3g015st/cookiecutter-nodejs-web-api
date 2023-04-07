import { Test, TestingModule } from '@nestjs/testing'
import { GetTodosUseCase } from './get-todos.usecase'
import { InfrastructureModule } from '@root/infrastructure/infrastructure.module'
import { IBackup, newDb } from 'pg-mem'
import { DataSource, Repository } from 'typeorm'
import { User } from '@root/infrastructure/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from '@root/infrastructure/entities/todo.entity'

describe('GetTodosUseCase - Unit Testing', () => {
  let backup: IBackup
  let service: GetTodosUseCase
  let dataSource: DataSource
  let usersRepository: Repository<User>
  let todoRepository: Repository<Todo>

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
      providers: [GetTodosUseCase],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile()

    service = module.get<GetTodosUseCase>(GetTodosUseCase)

    usersRepository = dataSource.getRepository(User)
    todoRepository = dataSource.getRepository(Todo)

    backup = db.backup()
  })

  afterAll(async () => {
    await dataSource.close()
  })

  beforeEach(async () => {
    const johnDoeUser = usersRepository.create({
      name: 'John Doe',
    })

    const janeDoeUser = usersRepository.create({
      name: 'Jane Doe',
    })

    await usersRepository.save(johnDoeUser)
    await usersRepository.save(janeDoeUser)

    const todoOne = todoRepository.create({
      title: 'John Doe #1',
      user: johnDoeUser,
    })

    const todoTwo = todoRepository.create({
      title: 'John Doe #2',
      user: johnDoeUser,
    })

    const todoThree = todoRepository.create({
      title: 'Jane Doe #1',
      user: janeDoeUser,
    })

    await todoRepository.save(todoOne)
    await todoRepository.save(todoTwo)
    await todoRepository.save(todoThree)
  })

  afterEach(async () => {
    backup.restore()
  })

  it('Should return all todos for John Doe', async () => {
    const response = await service.execute({ userId: 1 })
    expect(response.todos.length).toBe(2)
  })

  it('Should return all todos for Jane Doe', async () => {
    const response = await service.execute({ userId: 2 })
    expect(response.todos.length).toBe(1)
  })

  it('Should only return 1 item from page 1', async () => {
    const response = await service.execute({ page: 1, limit: 1 })
    expect(response.todos.length).toBe(1)
  })

  it('Should return no todos for Jing Doe', async () => {
    const response = await service.execute({ userId: 3 })
    expect(response.todos.length).toBe(0)
  })
})
