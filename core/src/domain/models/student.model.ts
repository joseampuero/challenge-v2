import { AggregateRoot } from '@nestjs/cqrs';
import { StudentEntity } from 'src/infrastructure/entities/student.entity';

export type StudentEssentialProperties = Required<{
  readonly id: string;
  readonly dni: number;
  readonly email: string;
}>;

export type StudentOptionalProperties = Partial<{
  readonly name: string;
  readonly surname: string;
  readonly delete: boolean;
}>;

export type StudentProperties = StudentEssentialProperties &
  Required<StudentOptionalProperties>;

export interface Student {
  properties: () => StudentProperties;
}

export class StudentImplement extends AggregateRoot implements Student {
  private readonly id: string;
  private readonly email: string;
  private dni: number;
  private name: string;
  private surname: string;
  private delete: boolean;

  constructor(
    properties: StudentEssentialProperties & StudentOptionalProperties,
  ) {
    super();
    Object.assign(this, properties);
  }

  properties(): StudentProperties {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      dni: this.dni,
      delete: this.delete,
    };
  }

  update(entity: StudentEntity): void {
    Object.assign(entity, this);
  }
}
