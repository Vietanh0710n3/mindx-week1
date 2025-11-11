import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigin = process.env.FRONTEND_ORIGIN || '*';
  app.enableCors({ origin: allowedOrigin });
  const port = process.env.PORT ? +process.env.PORT : 4000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}
bootstrap();
