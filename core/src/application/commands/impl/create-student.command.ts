import { ICommand } from '@nestjs/cqrs';
import { StudentDto } from '../../../interface/dtos/student.dto';

export class CreateStudentCommand implements ICommand {
  constructor(public readonly studentDto: StudentDto) {}
}
