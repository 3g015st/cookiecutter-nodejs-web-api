import { ITodo } from '@root/infrastructure/entities/todo.entity'

export interface IParams {
  userId?: number
  todoId?: number
  title?: string
  page?: number
  limit?: number
}

export interface IResponse<TMeta> {
  todos: Array<ITodo> | null
  meta: TMeta
}
