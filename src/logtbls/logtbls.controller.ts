import { Controller, Get, Header } from '@nestjs/common';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { LogtblsService } from './logtbls.service';

@Controller('logtbls')
export class LogtblsController {
  constructor(private readonly logtblsService: LogtblsService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll(): Promise<LogTbl[]> {
    return await this.logtblsService.findAll();
  }
}
