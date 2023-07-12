import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // ユーザ登録
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  // ユーザ認証（成功でJWT返却）
  async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    // 平文パスワードとDBのハッシュ化されたパスワードを比較
    if (user && (await bcrypt.compare(password, user.password))) {
      // JWTの生成（ここではid,usernameのみ、任意のものを追加可）
      const payload = { id: user.id, username: user.username };
      // 署名されたToken作成
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken };
    }
    throw new UnauthorizedException( // 400エラー生成
      'ユーザ名またはパスワードを確認してください'
    );
  }
}
