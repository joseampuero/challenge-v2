import { Body, Controller, Post } from '@nestjs/common';
import { StudentDto } from '../dtos/student.dto';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /* Create Student */
  /*--------------------------------------------*/
  @Post()
  async createStudent(@Body() studentDto: StudentDto): Promise<string> {
    return await this.studentService.createStudent(studentDto);
  }
}