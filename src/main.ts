import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cors from 'cors'
import { JsexpertProfiler } from 'jsexpert-lib';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jsexpertProfiler = new JsexpertProfiler()
  jsexpertProfiler.init({
    clientId: "0e7ef1ae-e832-456f-8c0e-6f005c01ffba",
    clientSecret: "78d695557b1e5abb1ab1c6af3c06da534c454836e0ab47b2af320992faebe1a7"
  })
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
