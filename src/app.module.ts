import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { TaskModule } from './modules/task/task.module';
import { Task } from './modules/task/entities/task.entity';
import { AuthModule } from './modules/auth/auth.module';
import { SharetModule } from './modules/sharet/sharet.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Task],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TaskModule,
    AuthModule,
    SharetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
