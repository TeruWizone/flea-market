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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TestJsonKey, TestUser } from './types/test-res';
import {
  TestChangePasswordDto,
  TestChangeRoleDto,
  TestJsonKeyDto,
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
    console.info(credentialsDto);
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
    console.info(this.result);
    return this.result as TestUser[];
  }

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  async signup(@Body() inputDto: TestSignUpDto): Promise<TestUser> {
    console.info('body:', inputDto);
    console.debug(inputDto);
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
    console.info('id:', id);
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
    console.info('id:', id, 'body:', inputDto);
    this.result.map((v) => {
      return (v.role = v.id === id ? inputDto.role : v.role);
    });
    return;
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() inputDto: TestChangePasswordDto): Promise<void> {
    console.info('body:', inputDto);
    return;
  }
}

@Controller('json-key')
export class JsonKeyController {
  jsonkeys = [
    { idx: '1', keyName: 'srcip', keyType: 'TEXT' },
    { idx: '2', keyName: 'sport', keyType: 'INT' },
    { idx: '3', keyName: 'dstip', keyType: 'TEXT' },
    { idx: '4', keyName: 'dport', keyType: 'INT' },
    { idx: '5', keyName: 'area', keyType: 'TEXT' },
    { idx: '6', keyName: 'area2', keyType: 'INT' },
    { idx: '7', keyName: 'area3', keyType: 'TEXT' },
    { idx: '8', keyName: 'area4', keyType: 'INT' },
    { idx: '9', keyName: 'area5', keyType: 'TEXT' },
    { idx: '10', keyName: 'area7area7', keyType: 'INT' },
  ];

  @Get()
  @ApiOperation({ summary: 'jsonキー取得' })
  @UseGuards(JwtAuthGuard)
  async get(): Promise<TestJsonKey[]> {
    console.info(this.jsonkeys);
    return this.jsonkeys as TestJsonKey[];
  }

  @Post('changeAll')
  @ApiOperation({ summary: 'jsonキー全更新' })
  @ApiBody({ type: [TestJsonKeyDto] })
  @UseGuards(JwtAuthGuard)
  async changeAll(
    @Body() testJsonKeysDto: TestJsonKeyDto[],
  ): Promise<TestJsonKey[]> {
    console.info('body:', testJsonKeysDto);
    this.jsonkeys = testJsonKeysDto;
    return this.jsonkeys as TestJsonKey[];
  }
}
