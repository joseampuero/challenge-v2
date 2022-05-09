import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StudentScoreEntity } from '../../../infrastructure/entities/student-score.entity';
import { StudentEntity } from '../../../infrastructure/entities/student.entity';
import { getRepository } from 'typeorm';
import { FindStudentsQuery } from '../impl/find-students.query';
import {
  FindStudentsResult,
  ItemInFindStudentsResult,
} from './find-students.result';

@QueryHandler(FindStudentsQuery)
export class FindStudentsHandler
  implements IQueryHandler<FindStudentsQuery, FindStudentsResult>
{
  async execute(): Promise<FindStudentsResult> {
    const allStudents = await getRepository(StudentEntity).find({
      where: { delete: false },
    });
    console.log('llege 1', allStudents);
    const allCoursesTaken = await getRepository(StudentScoreEntity).find({
      relations: ['score', 'courseProfessor', 'courseProfessor.course'],
    });
    const studentsResult = allStudents.map(
      (s) =>
        new ItemInFindStudentsResult(
          s,
          allCoursesTaken.filter((ct) => ct.studentId == s.id),
        ),
    );

    return studentsResult;
  }
}
