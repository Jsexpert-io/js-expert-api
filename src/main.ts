import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cors from 'cors'
import { jsexpertProfiler } from './Jsprofiler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Js Analyzer')
    .setDescription('The Js Analyzer API Description')
    .setVersion('2.0')
    .addTag('js-analyzer')
    .addBearerAuth()
    .build();
    app.use(jsexpertProfiler.JsServerPerformanceMiddeleware)
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cors())

  await app.listen(3001);
}
bootstrap();
