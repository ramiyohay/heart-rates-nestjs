import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { RequestCount } from '../shared/request-count.entity';

@Injectable()
export class RequestTrackingMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // get patientId from path or query
      const patientIdFromPath = (req.path.match(/\/patients\/([^\/\?]+)/) || [])[1];
      const patientIdFromQuery = req.query['patientId'] as string | undefined;
      const patientId = patientIdFromPath || patientIdFromQuery;
      
      // ignore invalid patient IDs
      if (!patientId || isNaN(Number(patientId))) {
        return next();
      }

      if (patientId) { // if patientId is valid, add or update the request count
        const repo = this.dataSource.getRepository(RequestCount);
        let rec = await repo.findOneBy({ patientId }).catch(()=>null);

        if (!rec) rec = repo.create({ patientId, count: 1 });
        else rec.count = (rec.count || 0) + 1;
        
        await repo.save(rec).catch(()=>{});
      }
    } catch (err) {
      console.warn('request-tracking error', err);
    } finally {
      next();
    }
  }
}
