import { Controller, Get, Header } from '@nestjs/common';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { LogtblsService } from './logtbls.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  async findAll(): Promise<LogTbl[]> {
    return await this.logtblsService.findAll();
  }
}
