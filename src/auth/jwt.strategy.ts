import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

// Jwt Strategyの実装
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      // 親クラスのコンストラクタにオブジェクトを渡す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWTの記述場所
      ignoreExpiration: false, // Token有効期限切れ無視（false:しないでエラーにする）
      secretOrKey: 'secretKey123', // 秘密鍵
    }); // 実認証処理はvalidateメソッド行う
  }

  // 実認証処理メソッド（validateで固定名）
  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOneBy({ id, username });

    if (user) {
      return user;
    }
    throw new UnauthorizedException(); // 401
  }
}
// 上記JWT Strategyを利用するにはauth.module.tsに登録が必要
