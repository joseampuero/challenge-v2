import { IsNumber, IsString } from 'class-validator';
import { NotificationDTO } from './notification.dto';

export class NewScoreNotificationDTO extends NotificationDTO {
  @IsNumber()
  score: number;

  @IsString()
  course: string;
}
