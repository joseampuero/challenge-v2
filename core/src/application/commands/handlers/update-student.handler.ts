import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { StudentRepository } from '../../../infrastructure/repositories/student.repository';
import { UpdateStudentCommand } from '../impl/update-student.command';

@CommandHandler(UpdateStudentCommand)
export class UpdateStudentHandler
  implements ICommandHandler<UpdateStudentCommand>
{
  constructor(private readonly repository: StudentRepository) {}

  async execute(command: UpdateStudentCommand) {
    const { studentDto } = command;
    return await this.repository.updateStudent(studentDto);
  }
}
