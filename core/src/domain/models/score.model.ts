import { AggregateRoot } from '@nestjs/cqrs';

export type ScoreEssentialProperties = Required<{
  readonly id: string;
  readonly theoretical: number;
}>;

export type ScoreProperties = ScoreEssentialProperties;

export interface Score {
  properties: () => ScoreProperties;
}

export class ScoreImplement extends AggregateRoot implements Score {
  private readonly id: string;
  private theoretical: number;

  constructor(properties: ScoreEssentialProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): ScoreProperties {
    return {
      id: this.id,
      theoretical: this.theoretical,
    };
  }

  average(): number {
    return this.theoretical;
  }
}
