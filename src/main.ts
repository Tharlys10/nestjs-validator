import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerStupe } from './docs/swagger';

async function bootstrap() {
  const { APP_MODE, APP_PREFIX, APP_PORT } = process.env;

  const app = await NestFactory.create(AppModule);

  const active_setup_swagger: string[] = ['local'];
  if (active_setup_swagger.includes(APP_MODE)) {
    swaggerStupe(app);
  }

  app.setGlobalPrefix(APP_PREFIX);

  await app.listen(+APP_PORT);
}
bootstrap();
