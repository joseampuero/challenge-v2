import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateStudentCommand } from '../../application/commands/impl/update-student.command';
import { CreateStudentCommand } from '../../application/commands/impl/create-student.command';
import { StudentDto } from '../dtos/student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createStudent(student: StudentDto): Promise<string> {
    return await this.commandBus.execute(new CreateStudentCommand(student));
  }

  async updateStudent(student: StudentDto) {
    return await this.commandBus.execute(new UpdateStudentCommand(student));
  }
}
