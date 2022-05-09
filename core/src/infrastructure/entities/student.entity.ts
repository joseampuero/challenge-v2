import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class StudentEntity {
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
}
