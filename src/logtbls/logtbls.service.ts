import { Injectable } from '@nestjs/common';
import { LogtblRepository } from './logtbl.repository';
import { LogTbl } from 'src/entities/log_tbl.entity';
import { Like, SelectQueryBuilder, getConnection, getManager, getRepository } from 'typeorm';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class LogtblsService {
  constructor(private readonly logtblRepository: LogtblRepository) {}

  private logtbls: LogTbl[] = [];

  async findAll0(): Promise<LogTbl[]> {
    return await this.logtblRepository.findBy({}); // find()と同じ
  }

  async findAll(): Promise<LogTbl[]> {
    const result = await this.logtblRepository
      .query(
        `select * 
        from log_tbl
        where tag <> 'get_pid_trigger_2023_07_14_19_48_11_574439' 
          and ((tag like '%spx%')) 
          and ((log_date between '2023-07-01 00:00' and '2023-07-31 23:59')) 
          and ( log_data->>'record'::text like '%test%') 
        order by log_date`
      )

    console.log(result);
    return result;
  }

}
