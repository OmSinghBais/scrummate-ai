import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn()
  team: Team;

  @Column()
  teamId: number;

  @Column()
  url: string;

  @Column('simple-array')
  events: string[]; // ['sprint_created', 'risk_changed', 'sprint_completed']

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  secret: string; // For webhook signature verification

  @CreateDateColumn()
  createdAt: Date;
}

