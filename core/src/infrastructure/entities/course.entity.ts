import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { CourseProfessorEntity } from './course-professor.entity';

@Entity('course')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  delete: boolean;

  @OneToMany(
    () => CourseProfessorEntity,
    (courseProfessor: CourseProfessorEntity) => courseProfessor.id,
  )
  courseProfessor: CourseProfessorEntity[];
}
