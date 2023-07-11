import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // Repositoryの登録は一つの機能が対象なのでFeatureを使う
  controllers: [ItemsController],
  providers: [ItemRepository,ItemsService],
})
export class ItemsModule {}
