import { CreateStudentHandler } from './create-student.handler';
import { DeleteStudentHandler } from './delete-student.handler';
import { UpdateStudentHandler } from './update-student.handler';

export const CommandHandlers = [
  CreateStudentHandler,
  UpdateStudentHandler,
  DeleteStudentHandler,
];
