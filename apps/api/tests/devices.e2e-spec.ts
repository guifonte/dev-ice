import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import faker from 'faker';

import { environment as env } from '../src/environments/environment';
import { DevicesModule } from '../src/devices/devices.module';
import { Category } from '../src/categories/category.entity';
import { Device } from '../src/devices/device.entity';
import { CreateDeviceDTO } from '../src/devices/create-device.dto';
import { mockCreateDeviceDTO, mockId } from './helpers';
import { CategoriesModule } from '../src/categories/categories.module';
import { CreateCategoryDTO } from '../src/categories/create-category.dto';

describe('DevicesModule (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        DevicesModule,
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

  async function createCategory(): Promise<Category> {
    const mockedCreateCatDTO: CreateCategoryDTO = {
      name: faker.random.word(),
    };
    return Promise.resolve<Category>(
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then((res) => {
          const category = new Category();
          category.id = res.body.id;
          category.name = res.body.name;

          return category;
        })
    );
  }

  describe('GET /devices', () => {
    it('should receive empty array', (done) => {
      request(app.getHttpServer())
        .get('/devices')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([], done);
    });

    it('should receive array with only the created Device', (done) => {
      /*
        - create category
        - create device of this category
      */
      const mockedCreateDevDTO: CreateDeviceDTO = mockCreateDeviceDTO();
      let receivedDev: Device;

      createCategory().then((cat) => {
        mockedCreateDevDTO.categoryId = cat.id;

        request(app.getHttpServer())
          .post('/devices')
          .send(mockedCreateDevDTO)
          .expect(201)
          .then((res) => {
            receivedDev = res.body;

            request(app.getHttpServer())
              .get('/devices')
              .expect('Content-Type', /json/)
              .expect(200)
              .expect((res) => {
                expect(res.body).toEqual([receivedDev]);
              })
              .end((err) => {
                if (err) return done(err);
                return done();
              });
          });
      });
    });
  });

  describe('POST /devices', () => {
    it('should receive 201 if post suceeds', (done) => {
      const mockedCreateDevDTO: CreateDeviceDTO = mockCreateDeviceDTO();

      createCategory().then((cat) => {
        mockedCreateDevDTO.categoryId = cat.id;

        request(app.getHttpServer())
          .post('/devices')
          .send(mockedCreateDevDTO)
          .expect(201)
          .expect((res) => {
            expect(res.body).toEqual({
              id: 1,
              partNumber: mockedCreateDevDTO.partNumber,
              color: mockedCreateDevDTO.color,
              category: { id: cat.id, name: cat.name },
            });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    it('should receive BAD_REQUEST (400) if category does not exists', (done) => {
      const mockedCreateDevDTO: CreateDeviceDTO = mockCreateDeviceDTO();

      request(app.getHttpServer())
        .post('/devices')
        .send(mockedCreateDevDTO)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if categoryId is not a number', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: mockId(),
        color: 'yellow',
        categoryId: faker.random.word(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'categoryId must be an integer number'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if partNumber is not a number', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: faker.random.word(),
        color: 'green',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'partNumber must be an integer number'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if partNumber is not a positive integer', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: -mockId(),
        color: 'red',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'partNumber must not be less than 1'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if partNumber is 0', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: 0,
        color: 'blue',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'partNumber must not be less than 1'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if partNumber is bigger than 4294967295 (max value for unsigned int)', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: 4294967296324234,
        color: 'blue',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'partNumber must not be greater than 4294967295'
          );
          if (err) return done(err);
          return done();
        });
    });
    it('should receive BAD_REQUEST (400) if color is empty', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: mockId(),
        color: '',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'color must be longer than or equal to 1 characters'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if color longer than 16 letters', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: mockId(),
        color: 'abcdefghijklmnopq',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe(
            'color must be shorter than or equal to 16 characters'
          );
          if (err) return done(err);
          return done();
        });
    });

    it('should receive BAD_REQUEST (400) if color is not only letters', (done) => {
      const wrongMockedCreateDevDTO = {
        partNumber: mockId(),
        color: 'l0r3m 1psulum',
        categoryId: mockId(),
      };

      request(app.getHttpServer())
        .post('/devices')
        .send(wrongMockedCreateDevDTO)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message[0]).toBe('color must contain only letters');
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('DELETE /devices', () => {
    it('should receive NO_CONTENT (204) if device does not exists', (done) => {
      request(app.getHttpServer())
        .delete(`/devices/2`)
        .expect(204)
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it('should receive 200 if device exists', (done) => {
      const mockedCreateDevDTO = mockCreateDeviceDTO();
      createCategory().then((cat) => {
        mockedCreateDevDTO.categoryId = cat.id;
        request(app.getHttpServer())
          .post('/devices')
          .send(mockedCreateDevDTO)
          .expect(201)
          .then(() => {
            request(app.getHttpServer())
              .delete(`/devices/1`)
              .expect(200)
              .then(() => {
                request(app.getHttpServer())
                  .get('/devices')
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
    });
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });
});
