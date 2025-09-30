import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { HeartReading } from './heart.entity';

@Injectable()
export class HeartService {
  constructor(@InjectRepository(HeartReading) private readonly heartRepo: Repository<HeartReading>) {}

  async create(dto: Partial<HeartReading>) {
    if (dto.timestamp && typeof dto.timestamp === 'string') dto.timestamp = new Date(dto.timestamp);

    const entity = this.heartRepo.create(dto);

    return this.heartRepo.save(entity);
  }

  // get all readings, optionally filtered by patientId
  async findAll(filter?: { patientId?: string }) {
    const qb = this.heartRepo.createQueryBuilder('r');
    
    if (filter?.patientId) qb.where('r.patientId = :p', { p: filter.patientId });
    
    return qb.orderBy('r.timestamp', 'ASC').getMany();
  }

  // get all readings with heart rate above 100 bpm for a specific patient
  async findAbove100bpmReadingsForPatient(filter?: { patientId?: string }) {
    const qb = this.heartRepo.createQueryBuilder('r').where('r.heartRate > :rate', { rate: 100 });
    
    if (filter?.patientId) qb.andWhere('r.patientId = :p', { p: filter.patientId });
    
    return qb.orderBy('r.timestamp', 'ASC').getMany();
  }

  // get all readings for a patient within a date range
  async findInRange(patientId: string, start?: Date, end?: Date) {
    const qb = this.heartRepo.createQueryBuilder('r').where('r.patientId = :p', { p: patientId });

    if (start) qb.andWhere('r.timestamp >= :s', { s: start.toISOString() });
    if (end) qb.andWhere('r.timestamp <= :e', { e: end.toISOString() });
    
    return qb.orderBy('r.timestamp', 'ASC').getMany();
  }

  // Get all readings with heart rate above 100 bpm, including patient details
  async findAbove100bpmReadings() {
    return this.heartRepo.find({
      where: { heartRate: MoreThan(100) },
      relations: ['patient'],
    });
  }
}
