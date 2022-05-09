import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessage } from './domain/error';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { UserImplement } from './models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async login(userLoginDto: LoginAuthDto) {
    const { name, password } = userLoginDto;
    const currentUser = new UserImplement().findUserByName(name);
    if (!currentUser)
      throw new HttpException(
        ErrorMessage.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    if (password != currentUser.password)
      throw new HttpException(
        ErrorMessage.PASSWORD_INVALID,
        HttpStatus.FORBIDDEN,
      );

    const payload = { name: currentUser.name };
    const token = this.jwtService.sign(payload);
    const data = { user: currentUser, token };
    return data;
  }
}
