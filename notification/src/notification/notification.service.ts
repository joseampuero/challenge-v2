import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NewStudentNotificationDTO } from './dtos/new-student-notification.dto';
import { NewScoreNotificationDTO } from './dtos/new-score-notification.dto';
import { ErrorMessage } from './domain/errors/error';

@Injectable()
export class NotificationService {
  constructor(private mailerService: MailerService) {}
  /**
   * Send welcome email to the student passed by parameter
   * @param {NewStudentNotificationDTO} newStudentNotificationDTO
   */
  async notifyNewStudent(newStudentNotificationDTO: NewStudentNotificationDTO) {
    if (newStudentNotificationDTO == null)
      throw new HttpException(
        ErrorMessage.INVALID_REQUEST,
        HttpStatus.BAD_REQUEST,
      );

    await this.mailerService.sendMail({
      to: newStudentNotificationDTO.email,
      subject: 'Welcome',
      template: '/new-student',
      context: {
        name: newStudentNotificationDTO.name,
      },
    });
  }

  /**
   * Send score email to the student passed by parameter
   * @param {NewScoreNotificationDTO} newScoreNotificationDTO
   */
  async notifyNewScore(newScoreNotificationDTO: NewScoreNotificationDTO) {
    if (newScoreNotificationDTO == null)
      throw new HttpException(
        ErrorMessage.INVALID_REQUEST,
        HttpStatus.BAD_REQUEST,
      );

    await this.mailerService.sendMail({
      to: newScoreNotificationDTO.email,
      subject: 'Score',
      template: '/new-score',
      context: {
        name: newScoreNotificationDTO.name,
        course: newScoreNotificationDTO.course,
        score: newScoreNotificationDTO.score,
      },
    });
  }
}
