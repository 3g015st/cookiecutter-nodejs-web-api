import { IUser } from '@root/infrastructure/entities/user.entity'

export interface IParams {
  userId?: number
}

export interface IResponse {
  users: Array<IUser> | null
}
