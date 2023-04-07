import { IsInt, IsString, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetTodosQueryDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  title?: string

  @IsInt()
  @IsOptional()
  userId?: number

  @IsInt()
  @IsOptional()
  todoId?: number

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Transform(({ value }) => value ?? 0)
  page: number = 0

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Transform(({ value }) => value ?? 10)
  limit: number = 10
}
