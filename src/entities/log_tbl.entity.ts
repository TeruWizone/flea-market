import { Column, Entity, Timestamp } from 'typeorm';

@Entity()
export class LogTbl {
  @Column({ type: 'text' })
  tag: string;

  @Column({ type: 'timestamp without time zone', primary: true })
  log_date: Timestamp;

  @Column({ type: 'jsonb' })
  log_data: string;
}

//# \d log_tbl
//                           テーブル "public.log_tbl"
//    列    |             型              | 照合順序 | Null 値を許容 | デフォルト
//----------+-----------------------------+----------+---------------+------------
// tag      | text                        |          | not null      |
// log_date | timestamp without time zone |          | not null      |
// log_data | jsonb                       |          | not null      |
//パーティションキー: RANGE (log_date)
//インデックス:
//    "log_tbl_time_idx" brin (log_date)
//パーティション数: 15 (\d+ で一覧を表示)。
