import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateHeartDto {
  @IsString()
  patientId: string;

  @IsDateString()
  timestamp: string;

  @IsInt()
  heartRate: number;
}
