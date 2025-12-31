import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class SprintPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn()
  team: Team;

  @Column()
  teamId: number;

  @Column()
  sprintName: string;

  @Column('text', { nullable: true })
  goal: string;

  @Column('json', { nullable: true })
  stories: any[]; // Array of story objects with points, dependencies, etc.

  @Column({ default: 0 })
  totalPoints: number;

  @Column({ default: 0 })
  capacity: number; // Team capacity in story points

  @Column('json', { nullable: true })
  blockers: any[];

  @Column({ default: 'planning' })
  status: string; // planning, active, completed

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

