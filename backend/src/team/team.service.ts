import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(name: string, description: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const team = this.teamRepository.create({
      name,
      description,
      members: [user],
    });

    return this.teamRepository.save(team);
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['teams'],
    });

    return user?.teams || [];
  }

  async findOne(id: number, userId: number) {
    const team = await this.teamRepository.findOne({ 
      where: { id },
      relations: ['members'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const isMember = team.members.some(member => member.id === userId);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this team');
    }

    return team;
  }

  async addMember(teamId: number, email: string, userId: number) {
    const team = await this.findOne(teamId, userId);
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (team.members.some(m => m.id === user.id)) {
      throw new ForbiddenException('User is already a member');
    }

    team.members.push(user);
    return this.teamRepository.save(team);
  }

  async removeMember(teamId: number, memberId: number, userId: number) {
    const team = await this.findOne(teamId, userId);
    
    if (team.members.length === 1) {
      throw new ForbiddenException('Cannot remove the last member');
    }

    team.members = team.members.filter(m => m.id !== memberId);
    return this.teamRepository.save(team);
  }
}

