import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorMessage } from '../../domain/error';
import { getRepository } from 'typeorm';
import { Student, StudentImplement } from '../../domain/models/student.model';
import {
  StudentDto,
  StudentIdRequestParamsDto,
} from '../../interface/dtos/student.dto';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentRepository {
  /**
   * Create a student from dto.
   * @param {StudentDto} studentDto
   */
  async createStudent(studentDto: StudentDto): Promise<string> {
    const student = new StudentImplement(studentDto);

    const studentCreted = await getRepository(StudentEntity).save(
      this.modelToEntity(student),
    );

    console.log('new-student');
    return studentCreted.id;
  }

  /**
   * Update a student from dto.
   * @param {StudentDto} studentDto
   */
  async updateStudent(studentDto: StudentDto): Promise<any> {
    const studentRepository = getRepository(StudentEntity);
    const studentToUpdate = await studentRepository.findOne({
      where: { id: studentDto.id },
    });

    if (!studentToUpdate)
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    const student = new StudentImplement(studentDto);
    student.update(studentToUpdate);

    return await studentRepository.save(studentToUpdate);
  }

  /**
   * Delete a student from id.
   * @param {StudentIdRequestParamsDto} studentIdDto
   */
  async deleteStudent(studentIdDto: StudentIdRequestParamsDto): Promise<void> {
    const studentRepository = getRepository(StudentEntity);
    const studentToUpdate = await studentRepository.findOne({
      where: { id: studentIdDto.studentId },
    });

    if (!studentToUpdate)
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    studentToUpdate.delete = true;

    await studentRepository.save(studentToUpdate);
  }

  private modelToEntity(model: Student): StudentEntity {
    const properties = model.properties();
    return { ...properties };
  }
}
