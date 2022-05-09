import { ChildEntity, Column } from 'typeorm';
import { ScoreEntity } from './score.entity';

@ChildEntity()
export class ScoreWithLaboratory extends ScoreEntity {
  @Column({ default: 0 })
  practical: number;
}
