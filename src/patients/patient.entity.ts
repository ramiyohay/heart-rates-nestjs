import { Entity, PrimaryColumn, Column,OneToMany } from 'typeorm';
import { HeartReading } from '../heart/heart.entity';

@Entity({ name: 'patient' })
export class Patient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  // create relation with HeartReading
  @OneToMany(() => HeartReading, (reading) => reading.patient)
  readings: HeartReading[];
}
