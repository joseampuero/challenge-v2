import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorMessage } from '../../domain/error';
import { getRepository } from 'typeorm';
import { Student, StudentImplement } from '../../domain/models/student.model';
import {
  AssignScoreRequestParamsDto,
  AssignStudentRequestParamsDto,
  StudentDto,
  StudentIdRequestParamsDto,
} from '../../interface/dtos/student.dto';
import { StudentEntity } from '../entities/student.entity';
import { ScoreEntity } from '../entities/score.entity';
import { StudentScoreEntity } from '../entities/student-score.entity';
import { CourseProfessorEntity } from '../entities/course-professor.entity';

@Injectable()
export class StudentRepository {
  /**
   * Create a student from dto.
   * @param {StudentDto} studentDto
   */
  async createStudent(studentDto: StudentDto): Promise<string> {
    const student = new StudentImplement(studentDto);

    const studentCreted = await getRepository(StudentEntity).save(
      this.modelToEntity(student),
    );

    console.log('new-student');
    return studentCreted.id;
  }

  /**
   * Update a student from dto.
   * @param {StudentDto} studentDto
   */
  async updateStudent(studentDto: StudentDto): Promise<any> {
    const studentRepository = getRepository(StudentEntity);
    const studentToUpdate = await studentRepository.findOne({
      where: { id: studentDto.id },
    });

    if (!studentToUpdate)
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    const student = new StudentImplement(studentDto);
    student.update(studentToUpdate);

    return await studentRepository.save(studentToUpdate);
  }

  /**
   * Delete a student from id.
   * @param {StudentIdRequestParamsDto} studentIdDto
   */
  async deleteStudent(studentIdDto: StudentIdRequestParamsDto): Promise<void> {
    const studentRepository = getRepository(StudentEntity);
    const studentToUpdate = await studentRepository.findOne({
      where: { id: studentIdDto.studentId },
    });

    if (!studentToUpdate)
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    studentToUpdate.delete = true;

    await studentRepository.save(studentToUpdate);
  }
  /**
   * Assign a course to a student.
   * @param {AssignStudentRequestParamsDto} assingStudentDto
   */
  async assingCourse(
    assingStudentDto: AssignStudentRequestParamsDto,
  ): Promise<void> {
    await this.assignCourseValidations(assingStudentDto);

    const score = await getRepository(ScoreEntity).save(new ScoreEntity());
    console.log(score);
    const studentScore = new StudentScoreEntity();
    studentScore.studentId = assingStudentDto.id;
    studentScore.courseProfessorId = assingStudentDto.courseId;
    studentScore.scoreId = score.id;

    await getRepository(StudentScoreEntity).save(studentScore);
  }

  /**
   * Assign a new score to a student.
   * @param {string} professorId
   * @param {AssignScoreRequestParamsDto} assingScoreDto
   */
  async assingScore(
    professorId: string,
    assingScoreDto: AssignScoreRequestParamsDto,
  ): Promise<void> {
    const courseTaken = await getRepository(StudentScoreEntity).findOne({
      where: {
        studentId: assingScoreDto.id,
        courseProfessorId: assingScoreDto.courseId,
      },
      relations: [
        'score',
        'courseProfessor',
        'courseProfessor.professor',
        'courseProfessor.course',
        'student',
      ],
    });

    if (!courseTaken)
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_ASSIGNED,
        HttpStatus.METHOD_NOT_ALLOWED,
      );

    if (
      !Object.values(professorId).includes(
        courseTaken.courseProfessor.professor.id,
      )
    )
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_ASSIGNED,
        HttpStatus.METHOD_NOT_ALLOWED,
      );

    courseTaken.score.theoretical = assingScoreDto.theoretical;
    await getRepository(ScoreEntity).save(courseTaken.score);

    const dtoNotification = {
      name: courseTaken.student.name,
      course: courseTaken.courseProfessor.course.name,
      score: courseTaken.score.theoretical,
    };
    //this.notificationClient.send({ cmd: 'new-score' }, { dtoNotification });
  }

  //#region  Private Methods
  private modelToEntity(model: Student): StudentEntity {
    const properties = model.properties();
    return { ...properties };
  }

  private async assignCourseValidations(
    assingStudentDto: AssignStudentRequestParamsDto,
  ): Promise<void> {
    const { id, courseId } = assingStudentDto;
    // cannot reassign an already assigned course
    const courseTaken = await getRepository(StudentScoreEntity).findOne({
      where: {
        studentId: id,
        courseProfessorId: courseId,
      },
    });
    if (courseTaken)
      throw new HttpException(
        ErrorMessage.CANNOT_REASSIGN,
        HttpStatus.METHOD_NOT_ALLOWED,
      );

    const course = await getRepository(CourseProfessorEntity).findOne({
      where: { id: courseId, delete: false },
    });

    const student = await getRepository(StudentEntity).findOne({
      where: { id: id, delete: false },
    });

    if (!(student && course))
      throw new HttpException(
        ErrorMessage.STUDENT_IS_NOT_FOUND,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
  }
  //#endregion
}
