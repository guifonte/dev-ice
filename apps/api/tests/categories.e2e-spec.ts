import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import faker from 'faker';

import { environment as env } from '../src/environments/environment';
import { CategoriesModule } from '../src/categories/categories.module';
import { Category } from '../src/categories/category.entity';
import { Device } from '../src/devices/device.entity';
import { CreateCategoryDTO } from '../src/categories/create-category.dto';

describe('CategoriesModule (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        TypeOrmModule.forFeature([Category, Device]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: env.RDS_HOSTNAME,
          port: +env.RDS_PORT,
          username: env.RDS_USERNAME,
          password: env.RDS_PASSWORD,
          database: env.RDS_DB_NAME,
          synchronize: true,
          dropSchema: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([]);
  });

  it('/categories (POST)', () => {
    const mockedCreateCatDTO: CreateCategoryDTO = { name: faker.random.word() };
    return request(app.getHttpServer())
      .post('/categories')
      .send(mockedCreateCatDTO)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(1);
        expect(res.body.name).toEqual(mockedCreateCatDTO.name);
      });
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });
});
