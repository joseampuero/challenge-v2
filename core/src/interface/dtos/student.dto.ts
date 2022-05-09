import { IsString } from 'class-validator';

export class StudentIdRequestParamsDto {
  @IsString()
  readonly studentId!: string;
}

export class StudentDto {
  @IsString()
  readonly id!: string;
  @IsString()
  name!: string;
  @IsString()
  surname!: string;
  @IsString()
  dni!: number;
  @IsString()
  email!: string;
}
