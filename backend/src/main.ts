import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  (app as NestExpressApplication).enable('trust proxy');

  const config = new DocumentBuilder()
    .setTitle('Vehicle Reservations System')
    .setDescription('VRS Api Description')
    .setVersion('1.0')
    .addTag('vrs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  logger.log(`Server is running in ${ await app.getUrl() }`);
}
bootstrap();
