import { Body, Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ErrorMessage } from './domain/errors/error';
import { NewScoreNotificationDTO } from './dtos/new-score-notification.dto';
import { NewStudentNotificationDTO } from './dtos/new-student-notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'new-student' })
  async notifyNewStudent(
    @Body() newStudentNotificationDTO: NewStudentNotificationDTO,
  ): Promise<void> {
    console.log(newStudentNotificationDTO);

    this.notificationService.notifyNewStudent(newStudentNotificationDTO);
  }

  @MessagePattern({ cmd: 'new-score' })
  async notifyNewScore(
    @Body() newScoreNotificationDTO: NewScoreNotificationDTO,
  ): Promise<void> {
    this.notificationService.notifyNewScore(newScoreNotificationDTO);
  }
}
