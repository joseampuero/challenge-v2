import { IsNegative, IsNumber, IsString } from 'class-validator';

export class StudentIdRequestParamsDto {
  @IsString()
  readonly studentId!: string;
}

export class AssignStudentRequestParamsDto {
  @IsString()
  readonly id!: string;
  @IsString()
  readonly courseId!: string;
}

export class AssignScoreRequestParamsDto extends AssignStudentRequestParamsDto {
  @IsNumber()
  @IsNegative()
  readonly practical!: number;
  @IsNumber()
  @IsNegative()
  readonly theoretical: number;
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
