import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://scrummate-ai-2t6u.vercel.app',
      /\.vercel\.app$/,  // Allow all Vercel preview deployments
      /^https:\/\/scrummate-.*\.vercel\.app$/,  // More specific pattern
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type'],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
