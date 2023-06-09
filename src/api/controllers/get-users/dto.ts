import { IsInt, IsString, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetUsersQueryDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  name?: string

  @IsInt()
  @IsOptional()
  id?: number

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
