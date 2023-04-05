import { Module } from '@nestjs/common'
import { GetUsersModule } from './get-users/get-users.module'

@Module({
  imports: [GetUsersModule],
  exports: [GetUsersModule],
})
export class FeaturesModule {}
