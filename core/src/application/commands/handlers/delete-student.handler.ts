import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { StudentRepository } from '../../../infrastructure/repositories/student.repository';
import { DeleteStudentCommand } from '../impl/delete-student.command';

@CommandHandler(DeleteStudentCommand)
export class DeleteStudentHandler
  implements ICommandHandler<DeleteStudentCommand>
{
  constructor(private readonly repository: StudentRepository) {}

  async execute(command: DeleteStudentCommand) {
    const { studentDto } = command;

    await this.repository.deleteStudent(studentDto);
  }
}
