import { Module } from '@nestjs/common';
import { LogtblsController } from './logtbls.controller';
import { LogtblsService } from './logtbls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { LogtblRepository } from './logtbl.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogTbl])],
  controllers: [LogtblsController],
  providers: [LogtblRepository, LogtblsService],
})
export class LogtblsModule {}
