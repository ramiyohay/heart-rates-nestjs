import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly service: PatientService) {}


  // create new patient
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.service.create(dto);
  }


  // list all patients OR get patient by id
  @Get()
  list(@Query('patientId') patientId?: string) {
    if (patientId) return this.service.findOne(patientId);

    return this.service.findAll();
  }

  // get all request counts
  @Get('requests')
  getAllRequests() {
    return this.service.getAllRequestCounts();
  }

  // get request count for a patient
  @Get(':id/requests')
  async getRequestCount(@Param('id') id: string) {
    const c = await this.service.getRequestCount(id);

    return { patientId: id, count: c };
  }

  // get patient by id
  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // update patient by id
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.service.update(id, dto);
  }
}
