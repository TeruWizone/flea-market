import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const salt = await bcrypt.genSalt(); // salt:ハッシュ値の強度を高める文字列
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username: username,
      password: hashPassword,
      status: status,
    });

    await this.save(user);
    return user;
  }
}
