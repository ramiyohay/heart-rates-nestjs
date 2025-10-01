import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { validateDateRange } from '../shared/date-validation';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}
 
  // get stats for a specific patient, optionally within a date range
  @Get(':patientId')
  async get(
    @Param('patientId') patientId: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const { startDate, endDate } = validateDateRange(start, end);
   
    return this.service.stats(patientId, startDate, endDate);
  }
}
