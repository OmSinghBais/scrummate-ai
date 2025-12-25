import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintModule } from './sprint/sprint.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'omsinghbais',
      password: '15O04m06@',
      database: 'scrummate',
      autoLoadEntities: true,
      synchronize: true, // dev only
      url: process.env.DATABASE_URL,
 
  
    }),
    SprintModule,
  ],
})
export class AppModule {}
