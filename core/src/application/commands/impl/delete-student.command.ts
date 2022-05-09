import { ICommand } from '@nestjs/cqrs';
import { StudentIdRequestParamsDto } from '../../../interface/dtos/student.dto';

export class DeleteStudentCommand implements ICommand {
  constructor(public readonly studentDto: StudentIdRequestParamsDto) {}
}
