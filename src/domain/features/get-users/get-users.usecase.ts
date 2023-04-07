import { Injectable } from '@nestjs/common'
import { IUseCase } from '@root/domain/interfaces/use-case'
import { IParams, IResponse } from './params-response'
import { User } from '@root/infrastructure/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'
import { IPaginationMeta, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class GetUserUseCase
  implements IUseCase<IParams, IResponse<IPaginationMeta>>
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(params: IParams): Promise<IResponse<IPaginationMeta>> {
    const { userId, name, page, limit } = params

    let where = {}

    if (userId) {
      where['id'] = userId
    }

    if (name) {
      where['name'] = Raw((alias) => `LOWER(${alias}) LIKE :value`, {
        value: `%${name}%`,
      })
    }

    const { items, meta } = await paginate<User>(
      this.usersRepository,
      { page, limit },
      { where },
    )
    return {
      users: items,
      meta,
    }
  }
}
