import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { StudentDto } from '../../src/interface/dtos/student.dto';

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
      id: '123',
    };
    const { body } = await request(app.getHttpServer())
      .post('/student')
      .send(dto)
      .expect(HttpStatus.CREATED);
  });
});
