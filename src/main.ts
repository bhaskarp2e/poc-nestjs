import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import {ValidationPipe} from "@nestjs/common";
import { AllExceptionsFilter } from './common/filters/expectations-filter';
import { ValidationPipe } from './common/pipes/validation.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4001);
}
bootstrap();
