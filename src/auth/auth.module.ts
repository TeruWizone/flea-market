import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 認証モジュール登録（デフォルトStrategy:jwt）
    JwtModule.register({
      secret: 'secretKey123', // 秘密鍵
      signOptions: {
        expiresIn: 3600,      // 有効期限（秒）
      }
    })
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, JwtAuthGuard],  //他の場所（itemsモジュール側）で利用するため
})
export class AuthModule {}

