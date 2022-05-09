import { ScoreEntity } from '../../infrastructure/entities/score.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { CourseProfessorEntity } from './course-professor.entity';
import { StudentEntity } from './student.entity';

@Entity('studentScore')
export class StudentScoreEntity {
  @OneToOne(() => StudentEntity, (student: StudentEntity) => student.id)
  @JoinColumn()
  student: StudentEntity;
  @PrimaryColumn('uuid')
  studentId: string;

  @OneToOne(
    () => CourseProfessorEntity,
    (courseProfessor: CourseProfessorEntity) => courseProfessor.id,
  )
  @JoinColumn()
  courseProfessor: CourseProfessorEntity;
  @PrimaryColumn('uuid')
  courseProfessorId: string;

  @OneToOne(() => ScoreEntity, (score: ScoreEntity) => score.id)
  @JoinColumn()
  score: ScoreEntity;
}
