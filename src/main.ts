import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para permitir solicitações apenas de http://localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Define um prefixo global para todas as rotas
  app.setGlobalPrefix('/api');

  await app.listen(3333);
}
bootstrap();
