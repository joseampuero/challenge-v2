import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateStudentCommand } from '../../application/commands/impl/create-student.command';
import { StudentDto } from '../dtos/student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createStudent(student: StudentDto) {
    return await this.commandBus.execute(new CreateStudentCommand(student));
  }
}
