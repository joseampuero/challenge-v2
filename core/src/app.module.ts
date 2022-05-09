import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsToken } from './domain/clients-token';
import { StudentModule } from './modules/student.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ClientsToken.NOTIFICATION_CLIENT,
        transport: Transport.TCP,
      },
      {
        name: ClientsToken.AUTH_CLIENT,
        transport: Transport.TCP,
        options: {
          port: 3201,
        },
      },
    ]),
    StudentModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
