import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
//import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    //private readonly userRepository: UserRepository,
    // Repositoryファイルで分けない書き方
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ユーザ登録
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    //return await this.userRepository.createUser(createUserDto);
    // Repositoryファイルで分けない書き方
    const { username, password, status } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashPassword,
      status,
    });

    await this.userRepository.save(user);
    return user;
  }

  // ユーザ認証（成功でJWT返却）
  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    // 平文パスワードとDBのハッシュ化されたパスワードを比較
    if (user && (await bcrypt.compare(password, user.password))) {
      // JWTの生成（ここではid,usernameのみ、任意のものを追加可）
      const payload = { id: user.id, username: user.username };
      // 署名されたToken作成
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException( // 401エラー生成
      'ユーザ名またはパスワードを確認してください',
    );
  }
}
