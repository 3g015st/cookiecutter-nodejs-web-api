import { Module } from '@nestjs/common'
import { DomainModule } from './domain/domain.module'
import { ApiModule } from './api/api.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, ApiModule, InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
