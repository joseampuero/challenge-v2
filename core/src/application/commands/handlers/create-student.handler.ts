import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { StudentRepository } from '../../../infrastructure/repositories/student.repository';
import { CreateStudentCommand } from '../impl/create-student.command';

@CommandHandler(CreateStudentCommand)
export class CreateStudentHandler
  implements ICommandHandler<CreateStudentCommand>
{
  constructor(private readonly repository: StudentRepository) {}

  async execute(command: CreateStudentCommand): Promise<string> {
    const { studentDto } = command;
    return await this.repository.createStudent(studentDto);
  }
}
