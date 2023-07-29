import { Timestamp } from 'typeorm';

export interface LogTbl {
  tag: string;
  log_date: Timestamp;
  log_data: string;
}
