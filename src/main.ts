import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, raw, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Habilita o rawBody corretamente
  });

  app.enableCors({
    methods: '*',
    origin: '*',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('API Rest Ecommerce')
    .setDescription('Documentação de uma API de Ecommerce, focada na venda de produtos variados.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
