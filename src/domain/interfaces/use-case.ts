export interface IUseCase<IParams, IResponse> {
  execute(params: IParams): Promise<IResponse>
}
