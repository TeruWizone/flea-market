import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]), // Repositoryの登録は一つの機能が対象なのでFeatureを使う
    AuthModule, // AuthModuleのexportsに記述したProvidersを利用
  ], 
  controllers: [ItemsController],
  providers: [ItemRepository, ItemsService],
})
export class ItemsModule {}
