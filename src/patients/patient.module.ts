import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { RequestCount } from '../shared/request-count.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, RequestCount])],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})

export class PatientModule {}
