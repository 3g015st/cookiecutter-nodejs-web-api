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
      where = { ...where, id: todoId }
      query = {
        ...query,
        where,
      }
    }

    if (userId) {
      where = { ...where, user: { id: userId } }
      query = {
        ...query,
        relations: {
          user: true,
        },
        where,
      }
    }

    if (title) {
      where = {
        ...where,
        title: Raw((alias) => `LOWER(${alias}) LIKE :value`, {
          value: `%${name}%`,
        }),
      }
      query = {
        ...query,
        where,
      }
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
