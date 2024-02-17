import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'express-async-errors';
import { chOrm } from './Utils/clickhouseDbSetup';
import { AppModule } from './app.module';
import { traceTableSchema } from './server-data/v1/traces/clickHouseDto/traceModel';

async function setupTables() {
  await chOrm.autoCreateTableSql('trace_data', traceTableSchema)
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await chOrm.createDatabase()
    await setupTables()
  } catch (error) {
    console.log('Error while creating tables', error)
  }

  const config = new DocumentBuilder()
    .setTitle('Js Analyzer')
    .setDescription('The Js Analyzer API Description')
    .setVersion('2.3')
    .addTag('js-analyzer')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());

  await app.listen(3001);
}
bootstrap();
