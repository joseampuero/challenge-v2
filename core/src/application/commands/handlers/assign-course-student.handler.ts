import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { StudentRepository } from '../../../infrastructure/repositories/student.repository';
import { AssignCourseStudentCommand } from '../impl/assign-course-student.command';

@CommandHandler(AssignCourseStudentCommand)
export class AssignCourseStudentHandler
  implements ICommandHandler<AssignCourseStudentCommand>
{
  constructor(private readonly repository: StudentRepository) {}

  async execute(command: AssignCourseStudentCommand) {
    const { assingStudentDto } = command;
    await this.repository.assingCourse(assingStudentDto);
  }
}
