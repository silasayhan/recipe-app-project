import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  console.log('🔥 Backend Başlatılıyor...');
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Backend Çalışıyor: http://localhost:${port}`);
}
bootstrap();