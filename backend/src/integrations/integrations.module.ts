import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { GitHubService } from './github.service';

@Module({
  providers: [JiraService, GitHubService],
  exports: [JiraService, GitHubService],
})
export class IntegrationsModule {}

