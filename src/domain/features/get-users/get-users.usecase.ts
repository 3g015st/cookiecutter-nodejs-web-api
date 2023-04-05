import { Injectable } from '@nestjs/common'
import { IUseCase } from '@root/domain/interfaces/use-case'
import { IParams, IResponse } from './params-response'
import { User } from '@root/infrastructure/entities/user.entity'

@Injectable()
export class GetUserUseCase implements IUseCase<IParams, IResponse> {
  constructor() {}

  execute(params: IParams): IResponse {
    const { userId } = params

    const user: User = { id: 1, name: 'John' }
    const userTwo: User = { id: 2, name: 'Doe' }

    const users = [user, userTwo]

    if (userId) {
      const foundUsers = users.find((user) => user.id == userId)

      return {
        users: foundUsers ? [foundUsers] : null,
      }
    }

    return {
      users,
    }
  }
}
