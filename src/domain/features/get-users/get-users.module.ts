import { Module } from '@nestjs/common'

import { GetUserUseCase } from './get-users.usecase'

@Module({
  imports: [],
  providers: [GetUserUseCase],
  exports: [GetUserUseCase],
})
export class GetUsersModule {}
