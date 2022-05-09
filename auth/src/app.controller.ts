import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() userLoginDto: LoginAuthDto) {
    return await this.appService.login(userLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  test(): string {
    return 'Im test!';
  }
}
