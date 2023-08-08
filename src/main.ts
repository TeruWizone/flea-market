import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import { dump } from 'js-yaml';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/exidsvrnonkey.pem'),
    cert: fs.readFileSync('./ssl/exidsvrcrt.pem'),
  };
  //const app = await NestFactory.create(AppModule, {httpsOptions});
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Flea Market')
    .setDescription('Flea Market Application Endpoint API description')
    .setVersion('1.0')
    .addTag('logtbls')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // YAML
  fs.writeFileSync('./swagger-spec.yaml', dump(document, {}));
  SwaggerModule.setup('api', app, document);

  app.enableCors(); // Enable CORS in NestJS

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
