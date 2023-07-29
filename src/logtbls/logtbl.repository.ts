import { Injectable } from '@nestjs/common';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LogtblRepository extends Repository<LogTbl> {
  constructor(private dataSource: DataSource) {
    super(LogTbl, dataSource.createEntityManager());
  }
}
