import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindStudentsResponseDTO } from '../dtos/find-students-response.dto';
import { StudentDto, StudentIdRequestParamsDto } from '../dtos/student.dto';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /* Create Student */
  /*--------------------------------------------*/
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStudent(@Body() studentDto: StudentDto): Promise<string> {
    return await this.studentService.createStudent(studentDto);
  }

  /* Update Student */
  /*--------------------------------------------*/
  @Put(':studentId')
  @HttpCode(HttpStatus.OK)
  async updateStudent(
    @Param() studentId: StudentIdRequestParamsDto,
    @Body() studentDto: StudentDto,
  ): Promise<any> {
    return this.studentService.updateStudent({ ...studentId, ...studentDto });
  }

  /* Delete Student */
  /*--------------------------------------------*/
  @Delete(':studentId')
  @HttpCode(HttpStatus.OK)
  async deleteStudent(
    @Param() studentId: StudentIdRequestParamsDto,
  ): Promise<void> {
    return this.studentService.deleteStudent(studentId);
  }

  /* List Students */
  /*--------------------------------------------*/
  @Get()
  @HttpCode(HttpStatus.OK)
  async findStudents(): Promise<FindStudentsResponseDTO> {
    return this.studentService.findStudents();
  }
}
