import { Module } from '@nestjs/common'

import { GetUserUseCase } from './get-users.usecase'
import { InfrastructureModule } from '@root/infrastructure/infrastructure.module'

@Module({
  imports: [InfrastructureModule],
  providers: [GetUserUseCase],
  exports: [GetUserUseCase],
})
export class GetUsersModule {}
