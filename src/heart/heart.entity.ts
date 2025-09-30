import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity({ name: 'heart_reading' })
export class HeartReading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: string;

  @Column()
  heartRate: number;

  @Column('datetime')
  timestamp: Date;

  // Relation to Patient
  @ManyToOne(() => Patient, (patient) => patient.readings, { onDelete: 'CASCADE' })
  patient: Patient;
}
