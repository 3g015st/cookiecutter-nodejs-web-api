import { Module } from '@nestjs/common'

import { GetTodosUseCase } from './get-todos.usecase'
import { InfrastructureModule } from '@root/infrastructure/infrastructure.module'

@Module({
  imports: [InfrastructureModule],
  providers: [GetTodosUseCase],
  exports: [GetTodosUseCase],
})
export class GetTodosModule {}
