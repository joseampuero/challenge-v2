import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseProfessorEntity } from './course-professor.entity';

@Entity('professor')
export class ProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  dni: number;

  @Column()
  email: string;

  @Column({ default: false })
  delete: boolean;

  @OneToMany(
    () => CourseProfessorEntity,
    (courseProfessor: CourseProfessorEntity) => courseProfessor.id,
  )
  courseProfessor: CourseProfessorEntity[];
}
