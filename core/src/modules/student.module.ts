import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentRepository } from '../infrastructure/repositories/student.repository';
import { CommandHandlers } from '../application/commands/handlers';
import { StudentController } from '../interface/controllers/student.controller';
import { StudentService } from '../interface/services/student.service';
import { QueriesHandlers } from '../application/queries/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [StudentController],
  providers: [
    StudentService,
    ...CommandHandlers,
    StudentRepository,
    ...QueriesHandlers,
  ],
})
export class StudentModule {
  constructor(private readonly command$: CommandBus) {}

  onModuleInit() {
    this.command$.register(CommandHandlers);
  }
}
