import { ChildEntity, Column } from 'typeorm';
import { CourseEntity } from './course.entity';

@ChildEntity()
export class CourseWithLaboratoryEntity extends CourseEntity {
  @Column()
  laboratoryNumber: number;
}
