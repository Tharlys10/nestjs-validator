import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerStupe = (app: INestApplication) => {
  const { APP_PREFIX, APP_PORT } = process.env;

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${APP_PORT}${APP_PREFIX}`, 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(APP_PREFIX, app, document);
};
