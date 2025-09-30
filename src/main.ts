import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import { Patient } from './patients/patient.entity';
import { HeartReading } from './heart/heart.entity';
import { RequestCount } from './shared/request-count.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // seed
  const ds = app.get(DataSource);
  const seedPath = './patients.json';

  if (fs.existsSync(seedPath)) { // load the seed data
    const raw = fs.readFileSync(seedPath, 'utf8');
    const seed = JSON.parse(raw);

    // first , clear all data
    await ds.getRepository(RequestCount).clear().catch(()=>{});
    await ds.getRepository(Patient).clear().catch(()=>{});
    await ds.getRepository(HeartReading).clear().catch(()=>{});

    // load the patients
    for (const p of seed.patients) {
      await ds.getRepository(Patient).save({
        id: String(p.id),
        name: p.name,
        age: p.age,
        gender: p.gender
      });
    }

    // load the heart readings
    for (const r of seed.heartRateReadings) {
      await ds.getRepository(HeartReading).save({
        patientId: String(r.patientId),
        heartRate: r.heartRate,
        timestamp: new Date(r.timestamp)
      });
    }
    console.log('Seed loaded');
  } else {
    console.log('No seed file found');
  }

  await app.listen(port);

  console.log(`Server is listening on ${port}`);
}

bootstrap();
