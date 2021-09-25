import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';

import { environment as env } from '../environments/environment';

@Module({
  imports: [
    CategoriesModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
