import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from '../team/team.entity';

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

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn()
  team: Team;

  @Column({ nullable: true })
  teamId: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
