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
}
