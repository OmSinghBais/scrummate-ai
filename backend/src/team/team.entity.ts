import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { SprintSnapshot } from '../sprint/sprint.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToMany(() => User, user => user.teams)
  members: User[];

  @OneToMany(() => SprintSnapshot, sprint => sprint.team)
  sprints: SprintSnapshot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

