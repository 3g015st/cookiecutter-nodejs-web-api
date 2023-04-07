import { Injectable } from '@nestjs/common'
import { IUseCase } from '@root/domain/interfaces/use-case'
import { IParams, IResponse } from './params-response'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'
import { Todo } from '@root/infrastructure/entities/todo.entity'
import { paginate, IPaginationMeta } from 'nestjs-typeorm-paginate'

@Injectable()
export class GetTodosUseCase
  implements IUseCase<IParams, IResponse<IPaginationMeta>>
{
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async execute(params: IParams): Promise<IResponse<IPaginationMeta>> {
    const { userId, todoId, title, page, limit } = params

    let query = {}
    let where = {}

    if (todoId) {
      where['id'] = todoId
      query['where'] = where
    }

    if (userId) {
      where['user'] = { id: userId }
      query['relations'] = { user: true }
      query['where'] = where
    }

    if (title) {
      where['title'] = Raw((alias) => `LOWER(${alias}) LIKE :value`, {
        value: `%${name}%`,
      })
      query['where'] = where
    }

    const { items, meta } = await paginate<Todo>(
      this.todosRepository,
      { page, limit },
      query,
    )
    return {
      todos: items,
      meta,
    }
  }
}
