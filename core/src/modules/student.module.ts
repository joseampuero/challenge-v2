import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentController } from '../interface/controllers/student.controller';
import { StudentService } from '../interface/services/student.service';

@Module({
  imports: [CqrsModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
