import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.TCP_PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(AppService.port());
}
bootstrap();
