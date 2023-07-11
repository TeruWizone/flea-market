import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity'; // modelからDBのEntityへ変更
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find(); // 全件取得
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOneBy({ id }); // 条件取得
    if(!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto); 
  } 

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    await this.itemRepository.save(item)
    return item
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete({id});
  }
}
