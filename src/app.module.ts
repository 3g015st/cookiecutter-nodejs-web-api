import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DomainModule } from './domain/domain.module'
import { ApiModule } from './api/api.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { getEnvPath } from './utils/file-utils'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './infrastructure/db'

const envFilePath: string = getEnvPath(`./configs`)

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    DomainModule,
    ApiModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
