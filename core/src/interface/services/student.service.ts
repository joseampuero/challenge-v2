import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateStudentCommand } from '../../application/commands/impl/update-student.command';
import { CreateStudentCommand } from '../../application/commands/impl/create-student.command';
import {
  AssignScoreRequestParamsDto,
  AssignStudentRequestParamsDto,
  StudentDto,
  StudentIdRequestParamsDto,
} from '../dtos/student.dto';
import { FindStudentsResponseDTO } from '../dtos/find-students-response.dto';
import { FindStudentsQuery } from '../../application/queries/impl/find-students.query';
import { DeleteStudentCommand } from '../../application/commands/impl/delete-student.command';
import { AssignCourseStudentCommand } from '../../application/commands/impl/assign-course-student.command';
import { AssignScoreStudentCommand } from '../../application/commands/impl/assign-score-student.command';

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

  async deleteStudent(student: StudentIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteStudentCommand(student));
  }

  async findStudents(): Promise<FindStudentsResponseDTO> {
    return await this.queryBus.execute(new FindStudentsQuery());
  }

  async assignCourse(assingStudentDto: AssignStudentRequestParamsDto) {
    return await this.commandBus.execute(
      new AssignCourseStudentCommand(assingStudentDto),
    );
  }

  async assignScore(
    id: string,
    assingScoreDto: AssignScoreRequestParamsDto,
  ): Promise<void> {
    return await this.commandBus.execute(
      new AssignScoreStudentCommand(assingScoreDto, id),
    );
  }
}
