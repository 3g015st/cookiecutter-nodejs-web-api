import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class HealthCheckController {
  constructor() {}

  @Get()
  async getHealthCheck() {
    return 'Cookiecutter - Healthy service.'
  }
}
