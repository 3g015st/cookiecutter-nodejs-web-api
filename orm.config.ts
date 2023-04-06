import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { getEnvPath } from './src/utils/file-utils'

const envFilePath: string = getEnvPath(`./configs`)

config({ path: envFilePath })

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: ['dist/src/infrastructure/entities/**/*.{ts,js}'],
  migrations: ['dist/src/migrations/**/*.{ts,js}'],
})
