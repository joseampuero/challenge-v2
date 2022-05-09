import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('score')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ScoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 0 })
  theoretical: number;

  @Column({ default: false })
  delete: boolean;
}
