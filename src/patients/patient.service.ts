import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { RequestCount } from '../shared/request-count.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,
    @InjectRepository(RequestCount) private readonly reqCountRepo: Repository<RequestCount>,
  ) {}

  // create new patient
  async create(dto: CreatePatientDto) {
    const p = this.patientRepo.create(dto);

    return this.patientRepo.save(p);
  }


  // update patient by id
  async update(id: string, dto: UpdatePatientDto) {
    const patient = await this.patientRepo.findOneBy({ id });

    if (!patient) throw new NotFoundException(`Patient with id ${id} not found`);
    
    Object.assign(patient, dto);
    
    return this.patientRepo.save(patient);
  }

  // get patient by id
  async findOne(id: string) {
    const patient = await this.patientRepo.findOneBy({ id });
    
    if (!patient) throw new NotFoundException(`Patient with id ${id} was not found`);
    
    return patient;
  }

  // get all patients
  async findAll() {
    const all = await this.patientRepo.find();

    
    if (!all || all.length === 0) throw new NotFoundException('No patients found');
    
    return all;
  }

  // request count per patient
  async getRequestCount(patientId: string) {
    const rec = await this.reqCountRepo.findOneBy({ patientId });

    return rec?.count || 0;
  }

  // all request counts
  async getAllRequestCounts() {
    return this.reqCountRepo.find();
  }
}
