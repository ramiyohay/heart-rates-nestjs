import { Entity, PrimaryColumn, Column } from 'typeorm';

// here we will store how many requests were made for each patient ID

@Entity({ name: 'request_count' })
export class RequestCount {
  @PrimaryColumn()
  patientId: string;

  @Column({ default: 0 })
  count: number;
}
