import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 認証モジュール登録（デフォルト:jwt）
    JwtModule.register({
      secret: 'secretKey123', // 秘密鍵
      signOptions: {
        expiresIn: 3600,      // 有効期限（秒）
      }
    })
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}

