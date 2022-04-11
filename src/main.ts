import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { promises } from 'fs';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pkg = JSON.parse(
    await promises.readFile(join('.', 'package.json'), 'utf8'),
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Best API ever!')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(83);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
