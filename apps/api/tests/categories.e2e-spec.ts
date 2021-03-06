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
import { mockCreateDeviceDTO } from './helpers';
import { DevicesModule } from '../src/devices/devices.module';

describe('CategoriesModule (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        DevicesModule,
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

  describe('GET /categories', () => {
    it('should receive empty array', (done) => {
      request(app.getHttpServer())
        .get('/categories')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([], done);
    });

    it('should receive array with only the created Category', (done) => {
      const mockedCreateCatDTO: CreateCategoryDTO = {
        name: faker.random.word(),
      };
      let receivedCat: Category;
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then((res) => {
          receivedCat = res.body;

          request(app.getHttpServer())
            .get('/categories')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
              expect(res.body).toEqual([receivedCat]);
            })
            .end((err) => {
              if (err) return done(err);
              return done();
            });
        });
    });
  });

  describe('POST /categories', () => {
    it('should return a Category with same name as the DTO and id 1', (done) => {
      const mockedCreateCatDTO: CreateCategoryDTO = {
        name: faker.random.word(),
      };
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.name).toEqual(mockedCreateCatDTO.name);
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return BAD_REQUEST (400) if name is not string', (done) => {
      const wrongCreateCatDTO = { name: 1 };
      request(app.getHttpServer())
        .post('/categories')
        .send(wrongCreateCatDTO)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return BAD_REQUEST (400) if name is empty', (done) => {
      const wrongCreateCatDTO = { name: '' };
      request(app.getHttpServer())
        .post('/categories')
        .send(wrongCreateCatDTO)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return BAD_REQUEST (400) if name is bigger than 128 char', (done) => {
      const wrongCreateCatDTO = { name: faker.random.alphaNumeric(129) };
      request(app.getHttpServer())
        .post('/categories')
        .send(wrongCreateCatDTO)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return BAD_REQUEST (400) if name is only white space', (done) => {
      const wrongCreateCatDTO = { name: '       ' };
      request(app.getHttpServer())
        .post('/categories')
        .send(wrongCreateCatDTO)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('DELETE /categories', () => {
    it('should receive NO_CONTENT (204) if categorie does not exists', (done) => {
      const mockedCreateCatDTO: CreateCategoryDTO = {
        name: faker.random.word(),
      };
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then(() => {
          request(app.getHttpServer())
            .delete(`/categories/2`)
            .expect(204)
            .end((err) => {
              if (err) {
                console.log(err);
                return done(err);
              }
              return done();
            });
        });
    });

    it('should receive 200 if categorie exists, no devices has it as category, an then remove it', (done) => {
      const mockedCreateCatDTO: CreateCategoryDTO = {
        name: faker.random.word(),
      };
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then(() => {
          request(app.getHttpServer())
            .delete(`/categories/1`)
            .expect(200)
            .then(() => {
              request(app.getHttpServer())
                .get('/categories')
                .expect(200)
                .expect((res) => {
                  expect(res.body).toEqual([]);
                })
                .end((err) => {
                  if (err) {
                    console.log(err);
                    return done(err);
                  }
                  return done();
                });
            });
        });
    });

    it('should receive CONFLICT (409) if categorie exists, but there are devices with this category', (done) => {
      const mockedCreateCatDTO: CreateCategoryDTO = {
        name: faker.random.word(),
      };
      const mockedCreateDevDTO = mockCreateDeviceDTO();
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then((res) => {
          mockedCreateDevDTO.categoryId = res.body.id;
          request(app.getHttpServer())
            .post('/devices')
            .send(mockedCreateDevDTO)
            .expect(201)
            .then(() => {
              request(app.getHttpServer())
                .delete(`/categories/1`)
                .expect(409)
                .end((err) => {
                  if (err) {
                    console.log(err);
                    return done(err);
                  }
                  return done();
                });
            });
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });
});
