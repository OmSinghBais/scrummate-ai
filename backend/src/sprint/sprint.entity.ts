import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class SprintSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ TEMPORARILY nullable to allow old rows
  @Column({ nullable: true })
  sprintName: string;

  @Column()
  healthScore: number;

  @Column()
  riskZone: string;

  @Column('json')
  metrics: any;

  @Column()
  mlPrediction: string;

  @Column('json', { nullable: true })
  mlExplanation: any;

  @CreateDateColumn()
  createdAt: Date;
}
