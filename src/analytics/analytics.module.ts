import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { HeartModule } from '../heart/heart.module';
import { HeartReading } from '../heart/heart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeartReading]), HeartModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})

export class AnalyticsModule {}
