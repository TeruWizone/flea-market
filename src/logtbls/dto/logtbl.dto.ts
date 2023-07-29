import { ApiProperty } from '@nestjs/swagger';

export class LogTblDto {
  @ApiProperty({ example: 'spx', description: 'Tag of log.' })
  tag: string;

  @ApiProperty({
    example: '2023-07-24 14:01:01',
    description: 'Timestamp of log.',
  })
  log_date: Date;

  @ApiProperty({
    example:
      '{ "record": "test log", "srcip": "172.25.1.1", "sport": 5000, "music": "IZONE", "hobby": "K-pop" }',
    description: 'Log of JSON type data',
  })
  log_data: string;
}
