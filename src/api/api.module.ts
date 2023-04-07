import { Module } from '@nestjs/common'
import controllers from './controllers'
import { DomainModule } from '@root/domain/domain.module'

@Module({
  imports: [DomainModule],
  controllers: [...controllers.users, ...controllers.todos, ...controllers.app],
  providers: [],
})
export class ApiModule {}
