import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailer = MailerModule.forRoot({
  transport: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@localhost>',
  },
  preview: true,
  template: {
    dir: join(process.cwd(), '/template'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
