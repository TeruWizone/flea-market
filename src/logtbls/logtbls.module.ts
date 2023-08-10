import { Module } from '@nestjs/common';
import { LogtblsController } from './logtbls.controller';
import { LogtblsService } from './logtbls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { LogtblRepository } from './logtbl.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LogTbl]), AuthModule],
  controllers: [LogtblsController],
  providers: [LogtblRepository, LogtblsService],
})
export class LogtblsModule {}
