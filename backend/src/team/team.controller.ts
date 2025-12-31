import { Controller, Get, Post, Body, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() body: { name: string; description?: string }, @Request() req) {
    return this.teamService.create(body.name, body.description || '', req.user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.teamService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.teamService.findOne(+id, req.user.userId);
  }

  @Post(':id/members')
  async addMember(@Param('id') id: string, @Body() body: { email: string }, @Request() req) {
    return this.teamService.addMember(+id, body.email, req.user.userId);
  }

  @Delete(':id/members/:memberId')
  async removeMember(@Param('id') id: string, @Param('memberId') memberId: string, @Request() req) {
    return this.teamService.removeMember(+id, +memberId, req.user.userId);
  }
}

