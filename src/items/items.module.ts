import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])], // Repositoryの登録は一つの機能が対象なのでFeatureを使う
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
