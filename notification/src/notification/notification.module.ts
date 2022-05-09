import { Module } from '@nestjs/common';
import { mailer } from './config/mailer';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [mailer],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
