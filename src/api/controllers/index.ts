import { GetTodosController } from './get-todos/get-todos.controller'
import { GetUsersController } from './get-users/get-users.controller'
import { HealthCheckController } from './health-check/health-check.controller'

export default {
  users: [GetUsersController],
  todos: [GetTodosController],
  app: [HealthCheckController],
}
