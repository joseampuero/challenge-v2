import { CourseEntity } from '../../infrastructure/entities/course.entity';
import { ProfessorEntity } from '../../infrastructure/entities/professor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courseProfessor')
export class CourseProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  startDate: Date;

  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.id)
  course: CourseEntity;

  @Column({ default: false })
  delete: boolean;

  @ManyToOne(
    () => ProfessorEntity,
    (professor: ProfessorEntity) => professor.id,
  )
  professor: ProfessorEntity;
}
