import { ICommand } from '@nestjs/cqrs';
import { AssignScoreRequestParamsDto } from '../../../interface/dtos/student.dto';

export class AssignScoreStudentCommand implements ICommand {
  constructor(
    public readonly assingScoreDto: AssignScoreRequestParamsDto,
    public readonly professorId: string,
  ) {}
}
