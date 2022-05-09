import { IsString } from 'class-validator';

export class NotificationDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
