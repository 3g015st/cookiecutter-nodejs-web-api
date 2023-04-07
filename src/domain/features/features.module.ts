import { Module } from '@nestjs/common'
import { GetUsersModule } from './get-users/get-users.module'
import { GetTodosModule } from './get-todos/get-todos.module'

@Module({
  imports: [GetUsersModule, GetTodosModule],
  exports: [GetUsersModule, GetTodosModule],
})
export class FeaturesModule {}
