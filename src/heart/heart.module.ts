import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeartReading } from './heart.entity';
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HeartReading])],
  controllers: [HeartController],
  providers: [HeartService],
  exports: [HeartService],
})

export class HeartModule {}
