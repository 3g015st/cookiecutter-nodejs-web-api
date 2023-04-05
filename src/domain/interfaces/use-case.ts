export interface IUseCase<IParams, IResponse> {
    execute(params : IParams) : IResponse
}