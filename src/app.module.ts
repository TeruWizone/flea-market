import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { LogtblsModule } from './logtbls/logtbls.module';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.25.60.65', //'loona.japaneast.cloudapp.azure.com',
      port: 5432,
      username: 'postgres', //'sleuser',
      password: 'postgres', //'Mercury1',
      database: 'postgres', //'nvme',
      autoLoadEntities: true,
      extra: {
        ssl: false, //true,
      },
    }),
    AuthModule,
    LogtblsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
