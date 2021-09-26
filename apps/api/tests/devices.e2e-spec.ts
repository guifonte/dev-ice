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

  async function createCategory(): Promise<number> {
    const mockedCreateCatDTO: CreateCategoryDTO = {
      name: faker.random.word(),
    };
    return Promise.resolve<number>(
      request(app.getHttpServer())
        .post('/categories')
        .send(mockedCreateCatDTO)
        .expect(201)
        .then((res) => {
          return res.body.id;
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

      createCategory().then((id) => {
        mockedCreateDevDTO.categoryId = id;

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
        color: faker.commerce.color(),
        categoryId: faker.random.word(),
      };
      wrongMockedCreateDevDTO.categoryId = faker.random.word();

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
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });
});
