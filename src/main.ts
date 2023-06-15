import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cors from 'cors'
import { JsexpertProfiler } from 'jsexpert-lib';
import { jsexpertProfiler } from './Jsprofiler';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(jsexpertProfiler.getJsServerPerformanceMiddeleware)
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cors())

  await app.listen(3001);
}
bootstrap();
