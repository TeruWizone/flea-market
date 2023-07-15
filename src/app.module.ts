import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource }from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { LogtblsModule } from './logtbls/logtbls.module';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true
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
