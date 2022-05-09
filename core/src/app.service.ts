import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { CourseProfessorEntity } from './infrastructure/entities/course-professor.entity';
import { CourseWithLaboratoryEntity } from './infrastructure/entities/course-with-laboratory.entity';
import { CourseEntity } from './infrastructure/entities/course.entity';
import { ProfessorEntity } from './infrastructure/entities/professor.entity';
import { ScoreWithLaboratory } from './infrastructure/entities/score-with-laboratory.entity';
import { ScoreEntity } from './infrastructure/entities/score.entity';
import { StudentScoreEntity } from './infrastructure/entities/student-score.entity';
import { StudentEntity } from './infrastructure/entities/student.entity';

class DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export class AppService implements OnModuleInit, OnModuleDestroy {
  private databaseConnection?: Connection | void;

  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 5000;
  }

  async onModuleInit(): Promise<void> {
    const entities = [
      StudentEntity,
      ProfessorEntity,
      CourseEntity,
      CourseProfessorEntity,
      CourseWithLaboratoryEntity,
      ScoreEntity,
      ScoreWithLaboratory,
      StudentScoreEntity,
    ];

    this.databaseConnection = await createConnection({
      ...this.loadDBConfig(),
      type: 'mysql',
      entities,
    }).catch((error: Error) => this.failToConnectDatabase(error));
  }

  private loadDBConfig(): DBConfig {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT ?? '3306', 10) || 3306,
      database: process.env.DATABASE_NAME || 'academy',
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '1234',
      synchronize: 'true' === process.env.DATABASE_SYNC || true,
      logging: 'true' === process.env.DATABASE_LOGGING || true,
    };
  }

  private failToConnectDatabase(error: Error): void {
    console.error(error);
    process.exit(1);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.databaseConnection) await this.databaseConnection.close();
  }
}
