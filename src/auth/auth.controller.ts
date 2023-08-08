import { Body, Controller, Post, Header, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestUser } from './types/testuser';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'signup' })
  @Header('Access-Control-Allow-Origin', '*')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin and return with JWT' })
  @ApiResponse({
    status: 200,
    description: 'signin completed.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  //@Header('Access-Control-Allow-Origin', '*')
  async signIn(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    console.log(credentialsDto);
    return await this.authService.signIn(credentialsDto);
  }

  @Get('users')
  async users(): Promise<TestUser[]> {
    const result = [
      { id: '1', username: 'User001', password: 'password', role: 'USER' },
      { id: '2', username: 'User002', password: 'password', role: 'USER' },
      { id: '3', username: 'User003', password: 'password', role: 'USER' },
      { id: '4', username: 'User004', password: 'password', role: 'ADMIN' },
      { id: '5', username: 'User005', password: 'password', role: 'ADMIN' },
      { id: '6', username: 'User006', password: 'password', role: 'ADMIN' },
    ];
    console.log(result);
    return result as TestUser[];
  }
}
