import { Body, Controller, Post, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
