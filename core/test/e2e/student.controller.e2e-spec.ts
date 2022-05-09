import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { StudentDto } from '../../src/interface/dtos/student.dto';
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
    const dto: StudentDto = {
      name: 'robert',
      surname: 'deniro',
      email: 'rdeniro@gmail.com',
      dni: 12345678,
      id: '',
    };
    const { body } = await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);
  });

  it('update should return changes', async () => {
    const emailUpdated = 'rdeniro18@gmail.com';
    const dto: StudentDto = {
      name: 'robert',
      surname: 'deniro',
      email: emailUpdated,
      dni: 12345678,
      id: '',
    };
    const { body } = await request(app.getHttpServer())
      .put('/student/14725e59-e57d-4aaa-bd48-745471ed67af')
      .send(dto)
      .expect(HttpStatus.OK);

    expect(body.email).toEqual(emailUpdated);
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
});
