import { GetUsersController } from './get-users/get-users.controller'
import { HealthCheckController } from './health-check/health-check.controller'

export default {
  users: [GetUsersController],
  app: [HealthCheckController],
}
