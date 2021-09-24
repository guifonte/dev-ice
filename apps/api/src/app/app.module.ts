import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { environment as env } from '../environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.RDS_HOSTNAME,
      port: +env.RDS_PORT,
      username: env.RDS_USERNAME,
      password: env.RDS_PASSWORD,
      database: env.RDS_DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
