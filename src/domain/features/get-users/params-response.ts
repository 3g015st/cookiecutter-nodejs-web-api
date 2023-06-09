import { IUser } from '@root/infrastructure/entities/user.entity'

export interface IParams {
  userId?: number
  name?: string
  page?: number
  limit?: number
}

export interface IResponse<TMeta> {
  users: Array<IUser> | null
  meta: TMeta
}
