import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { getRepository } from 'typeorm';
import { Student, StudentImplement } from '../../domain/models/student.model';
import { StudentDto } from '../../interface/dtos/student.dto';
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

  private modelToEntity(model: Student): StudentEntity {
    const properties = model.properties();
    return { ...properties };
  }
}
