import { Module } from '@nestjs/common'
import { FeaturesModule } from './features/features.module'

@Module({
  imports: [FeaturesModule],
  exports: [FeaturesModule],
})
export class DomainModule {}
