import { IUser } from '@root/infrastructure/entities/user.entity'

export interface IParams {
  userId?: number
  name?: string
}

export interface IResponse {
  users: Array<IUser> | null
}
