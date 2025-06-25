import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nestdb',
      entities: [User],
      synchronize: true, // tự tạo bảng từ entity (chỉ dùng cho dev)
    }),
    UsersModule,
  ],
})
export class AppModule {}
