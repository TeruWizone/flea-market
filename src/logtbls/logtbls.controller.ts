import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { LogtblsService } from './logtbls.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('logsearch')
@Controller('logsearch')
export class LogtblsController {
  constructor(private readonly logtblsService: LogtblsService) {}

  @Get('search')
  @ApiOperation({ summary: 'find all' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  //@Header('Access-Control-Allow-Origin', '*')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<LogTbl[]> {
    return await this.logtblsService.findAll();
  }
}
