import { Controller, Get, Query } from '@nestjs/common'
import { GetTodosQueryDto } from './dto'
import { GetTodosUseCase } from '@root/domain/features/get-todos/get-todos.usecase'

@Controller('api/todos')
export class GetTodosController {
  constructor(private getTodosUseCase: GetTodosUseCase) {}

  @Get()
  async getUsers(@Query() query: GetTodosQueryDto) {
    return this.getTodosUseCase.execute({
      userId: query?.userId,
      title: query?.title,
      todoId: query?.todoId,
    })
  }
}
