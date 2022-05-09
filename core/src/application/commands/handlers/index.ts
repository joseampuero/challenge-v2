import { AssignCourseStudentHandler } from './assign-course-student.handler';
import { AssignScoreStudentHandler } from './assign-score-student.handler';
import { CreateStudentHandler } from './create-student.handler';
import { DeleteStudentHandler } from './delete-student.handler';
import { UpdateStudentHandler } from './update-student.handler';

export const CommandHandlers = [
  CreateStudentHandler,
  UpdateStudentHandler,
  DeleteStudentHandler,
  AssignCourseStudentHandler,
  AssignScoreStudentHandler,
];
