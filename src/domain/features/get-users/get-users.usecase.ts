import { Injectable } from '@nestjs/common'
import { IUseCase } from '@root/domain/interfaces/use-case'
import { IParams, IResponse } from './params-response'
import { User } from '@root/infrastructure/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'

@Injectable()
export class GetUserUseCase implements IUseCase<IParams, IResponse> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(params: IParams): Promise<IResponse> {
    const { userId, name } = params

    let where = {}

    if (userId) {
      where = { ...where, id: userId }
    }

    if (name) {
      where = {
        ...where,
        name: Raw((alias) => `LOWER(${alias}) LIKE :value`, {
          value: `%${name}%`,
        }),
      }
    }

    const users = await this.usersRepository.find({ where })

    return {
      users,
    }
  }
}
