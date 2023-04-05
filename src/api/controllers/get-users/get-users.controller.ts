import { Controller, Get, Param, Query } from '@nestjs/common'
import { GetUserUseCase } from '@features/get-users/get-users.usecase'
import { GetUsersQueryDto } from './dto'

@Controller('api/users')
export class GetUsersController {
  constructor(private getUsersUseCase: GetUserUseCase) {}

  @Get()
  async getUsers(@Query() query: GetUsersQueryDto) {
    return this.getUsersUseCase.execute({ userId: query?.id })
  }
}
