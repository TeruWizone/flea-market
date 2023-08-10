import {
  Body,
  Controller,
  Post,
  Header,
  Get,
  UnauthorizedException,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestUser } from './types/test-res';
import {
  TestChangePasswordDto,
  TestChangeRoleDto,
  TestSignUpDto,
} from './dto/test-req.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup0')
  @ApiOperation({ summary: 'signup' })
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

  result = [
    { id: '1', username: 'User001', password: 'password', role: 'USER' },
    { id: '2', username: 'User002', password: 'password', role: 'USER' },
    { id: '3', username: 'User003', password: 'password', role: 'USER' },
    { id: '4', username: 'User004', password: 'password', role: 'ADMIN' },
    { id: '5', username: 'User005', password: 'password', role: 'ADMIN' },
    { id: '6', username: 'User006', password: 'password', role: 'ADMIN' },
  ];

  lastId = 6;

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async users(): Promise<TestUser[]> {
    //throw new UnauthorizedException();
    console.log(this.result);
    return this.result as TestUser[];
  }

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  async signup(@Body() inputDto: TestSignUpDto): Promise<TestUser> {
    console.log('body:', inputDto);
    console.log(inputDto);
    this.lastId += 1;
    const result = {
      id: String(this.lastId),
      username: inputDto.username,
      password: inputDto.password,
      role: inputDto.role,
    };
    this.result.push(result);
    return result as TestUser;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    console.log('id:', id);
    //this.result.pop();
    this.result = this.result.filter((v) => v.id !== id);
    return;
  }

  @Put(':id/change-role')
  @UseGuards(JwtAuthGuard)
  async changeRole(
    @Param('id') id: string,
    @Body() inputDto: TestChangeRoleDto,
  ): Promise<void> {
    console.log('id:', id, 'body:', inputDto);
    this.result.map((v) => {
      return (v.role = v.id === id ? inputDto.role : v.role);
    });
    return;
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() inputDto: TestChangePasswordDto): Promise<void> {
    console.log('body:', inputDto);
    return;
  }
}
