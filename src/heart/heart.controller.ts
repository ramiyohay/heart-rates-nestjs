import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { HeartService } from './heart.service';
import { CreateHeartDto } from './dto/create-heart.dto';

@Controller('heart-readings')
export class HeartController {
  constructor(private readonly service: HeartService) {}

  // create a new heart reading
  @Post()
  create(@Body() dto: CreateHeartDto) {
    return this.service.create(dto as any);
  }

  // list all readings, optionally filtered by patientId
  @Get()
  list(@Query('patientId') patientId?: string) {
    return this.service.findAll(patientId ? { patientId } : undefined);
  }

  // get all readings with heart rate above 100 bpm for a specific patient
  @Get(':patientId/above100bpm')
  high(@Param('patientId') patientId: string) {
    return this.service.findAbove100bpmReadingsForPatient({ patientId });
  }

  // get all readings for a patient within a date range
  @Get(':patientId/range')
  range(
    @Param('patientId') patientId: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const s = start ? new Date(start) : undefined;
    const e = end ? new Date(end) : undefined;

    return this.service.findInRange(patientId, s, e);
  }

  // get all readings with heart rate above 100 bpm, for all patients
  @Get('above100bpm')
  async findHighReadings() {
    return this.service.findAbove100bpmReadings();
  }
}
