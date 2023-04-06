import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config: ConfigService = app.get(ConfigService)
  const port: number = config.get<number>('PORT')

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(port, () => {
    console.log('Listening to:', config.get<string>('BASE_URL'))
  })
}
bootstrap()
