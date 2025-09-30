import { Module, MiddlewareConsumer ,RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patients/patient.module';
import { HeartModule } from './heart/heart.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { RequestCount } from './shared/request-count.entity';
import { RequestTrackingMiddleware } from './common/request-tracking.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // we will use SQLite for simplicity to use a file-based database
      database: 'data.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PatientModule,
    HeartModule,
    AnalyticsModule,
    TypeOrmModule.forFeature([RequestCount]),
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestTrackingMiddleware)
      .forRoutes( // we want to track only these routes because they have patient ID
        { path: 'patients/:id', method: RequestMethod.GET },
        { path: 'heart-readings', method: RequestMethod.GET }, 
      );
  }
}
