import { IQueryResult } from '@nestjs/cqrs';
import { ScoreImplement } from '../../../domain/models/score.model';
import { StudentScoreEntity } from '../../../infrastructure/entities/student-score.entity';
import { StudentEntity } from '../../../infrastructure/entities/student.entity';

class CourseResult {
  readonly name: string;

  readonly average: number;

  constructor(studentScore: StudentScoreEntity) {
    this.name = studentScore.courseProfessor.course.name;
    this.average = new ScoreImplement(studentScore.score).average();
  }
}

export class ItemInFindStudentsResult {
  readonly id: string;

  readonly name: string;

  readonly surname: string;

  readonly email: string;

  readonly dni: number;

  readonly courses: CourseResult[];

  constructor(student: StudentEntity, studentScore: StudentScoreEntity[]) {
    this.id = student.id;
    this.name = student.name;
    this.surname = student.surname;
    this.dni = student.dni;
    this.email = student.email;
    this.courses = studentScore.map((ct) => new CourseResult(ct));
  }
}

export class FindStudentsResult
  extends Array<ItemInFindStudentsResult>
  implements IQueryResult {}
