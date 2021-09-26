import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { environment as env } from '../environments/environment';

import { CategoriesModule } from '../categories/categories.module';
import { DevicesModule } from '../devices/devices.module';

const throttlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

@Module({
  imports: [
    CategoriesModule,
    DevicesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.RDS_HOSTNAME,
      port: +env.RDS_PORT,
      username: env.RDS_USERNAME,
      password: env.RDS_PASSWORD,
      database: env.RDS_DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      migrations: ['migration/*.js'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
  ],
  providers: [throttlerProvider],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
