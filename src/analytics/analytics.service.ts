import { Injectable,NotFoundException } from '@nestjs/common';
import { HeartService } from '../heart/heart.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly heart: HeartService) {}

  // Calculate stats: count, average, min, max heart rates for a patient in an optional date range
  async stats(patientId: string, start?: Date, end?: Date) {
    const readings = await this.heart.findInRange(patientId, start, end);
    
    if (!readings || readings.length === 0) {
       throw new NotFoundException(`Cannot find readings for patient ${patientId} in the specified range`);
    }

    const heartRates = readings.map(r => r.heartRate);
    const sum = heartRates.reduce((a, b) => a + b, 0);
    
    return {
      heart_rates_count: heartRates.length,
      average: sum / heartRates.length,
      min: Math.min(...heartRates),
      max: Math.max(...heartRates)
    };
  }
}
