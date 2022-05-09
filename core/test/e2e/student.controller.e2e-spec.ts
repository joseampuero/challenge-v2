import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import {
  AssignStudentRequestParamsDto,
  StudentDto,
} from '../../src/interface/dtos/student.dto';
import { v4 as uuidv4 } from 'uuid';
import { StudentEntity } from 'src/infrastructure/entities/student.entity';

describe('student controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
  });

  it('create should return id', async () => {
    const randomId = uuidv4();
    const dto: StudentDto = {
      name: 'robert',
      surname: 'deniro',
      email: 'rdeniro@gmail.com',
      dni: 12345678,
      id: randomId,
    };
    const { body } = await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .delete(`/student/${randomId}`)
      .expect(HttpStatus.OK);
  });

  it('update should return changes', async () => {
    const randomId = uuidv4();

    const dto: StudentDto = {
      name: 'robert',
      surname: 'deniro',
      email: 'rdeniro@gmail.com',
      dni: 12345678,
      id: randomId,
    };
    await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);

    const emailUpdated = 'rdeniro18@gmail.com';
    dto.email = emailUpdated;

    const { body } = await request(app.getHttpServer())
      .put(`/student/${randomId}`)
      .send(dto)
      .expect(HttpStatus.OK);

    expect(body.email).toEqual(emailUpdated);
    await request(app.getHttpServer())
      .delete(`/student/${randomId}`)
      .expect(HttpStatus.OK);
  });

  it('find() find student created', async () => {
    const randomId = uuidv4();
    const dto: StudentDto = {
      name: 'marcelo',
      surname: 'gallardo',
      email: 'mgallardo@gmail.com',
      dni: 10101010,
      id: randomId,
    };

    await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);

    const { body } = await request(app.getHttpServer())
      .get('/student')
      .expect(HttpStatus.OK);

    const found = Object.values(body).some((s: StudentEntity) => {
      const { id } = s;
      return id == randomId;
    });

    expect(found).toEqual(true);
  });

  it('delete not found student deleted', async () => {
    const randomId = uuidv4();
    const dto: StudentDto = {
      name: 'homero',
      surname: 'simpson',
      email: 'hsimpson@gmail.com',
      dni: 10101010,
      id: randomId,
    };

    await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);

    const { body } = await request(app.getHttpServer())
      .get('/student')
      .expect(HttpStatus.OK);

    const found = Object.values(body).some((s: StudentEntity) => {
      const { id } = s;
      return id == randomId;
    });

    expect(found).toEqual(true);

    await request(app.getHttpServer())
      .delete(`/student/${randomId}`)
      .expect(HttpStatus.OK);

    const { body: bodyAfterDelete } = await request(app.getHttpServer())
      .get('/student')
      .expect(HttpStatus.OK);

    const foundAfterDelete = Object.values(bodyAfterDelete).some(
      (s: StudentEntity) => {
        const { id } = s;
        return id == randomId;
      },
    );
    expect(foundAfterDelete).toEqual(false);
  });

  it('cannot reassign a course', async () => {
    const randomId = uuidv4();
    const dto: StudentDto = {
      name: 'diego',
      surname: 'maradona',
      email: 'diegote@gmail.com',
      dni: 10101010,
      id: randomId,
    };

    await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);

    const courseAlgebra = '4f70ba2a-ce25-11ec-832c-401c839f1adc';
    const assignDto: AssignStudentRequestParamsDto = {
      id: randomId,
      courseId: courseAlgebra,
    };
    await request(app.getHttpServer())
      .post('/student/assignCourse')
      .send(assignDto)
      .expect(HttpStatus.OK);

    await request(app.getHttpServer())
      .post('/student/assignCourse')
      .send(assignDto)
      .expect(HttpStatus.METHOD_NOT_ALLOWED);
  });
});
