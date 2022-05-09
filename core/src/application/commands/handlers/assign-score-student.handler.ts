import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { StudentRepository } from '../../../infrastructure/repositories/student.repository';
import { AssignScoreStudentCommand } from '../impl/assign-score-student.command';

@CommandHandler(AssignScoreStudentCommand)
export class AssignScoreStudentHandler
  implements ICommandHandler<AssignScoreStudentCommand>
{
  constructor(private readonly repository: StudentRepository) {}

  async execute(command: AssignScoreStudentCommand) {
    const { professorId, assingScoreDto } = command;

    await this.repository.assingScore(professorId, assingScoreDto);
  }
}
