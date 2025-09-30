import { IsString, IsInt, IsOptional, IsIn } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: 'male' | 'female';
}
