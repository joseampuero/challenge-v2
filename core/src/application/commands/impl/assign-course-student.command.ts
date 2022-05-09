import { ICommand } from '@nestjs/cqrs';
import { AssignStudentRequestParamsDto } from '../../../interface/dtos/student.dto';

export class AssignCourseStudentCommand implements ICommand {
  constructor(
    public readonly assingStudentDto: AssignStudentRequestParamsDto,
  ) {}
}
