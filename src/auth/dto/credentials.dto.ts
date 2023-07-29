import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    example: 'shibuya',
    description: 'User name for authentication.',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Password for authentication.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
