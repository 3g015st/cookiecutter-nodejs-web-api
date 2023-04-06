import { Injectable } from '@nestjs/common'
import { IUseCase } from '@root/domain/interfaces/use-case'
import { IParams, IResponse } from './params-response'
import { User } from '@root/infrastructure/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class GetUserUseCase implements IUseCase<IParams, IResponse> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(params: IParams): Promise<IResponse> {
    const { userId } = params

    let where = {}

    if (userId) {
      where = { ...where, id: userId }
    }

    const users = await this.usersRepository.find({ where })

    return {
      users,
    }
  }
}
