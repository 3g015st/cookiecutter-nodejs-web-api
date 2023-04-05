export interface IRepository<T> {
  getMany(params: IGetAllParams): Promise<T[]>
  getOne(id: string): Promise<T>
  createOne(item: T): Promise<T>
  updateOne(id: string, item: T): Promise<boolean>
  removeOne(id: string): Promise<boolean>
}

export interface IGetAllParams {
  limit?: number
  offset?: number
  sortField?: string
  sortOrder?: 'ASC' | 'DESC'
}
