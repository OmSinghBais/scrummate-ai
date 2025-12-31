import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  type: string; // 'risk_alert', 'sprint_update', 'team_invite', etc.

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column('json', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;
}

