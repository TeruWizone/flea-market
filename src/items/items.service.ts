import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity'; // modelからDBのEntityへ変更
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';
import { User } from 'src/entities/user.entity';

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

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user); 
  } 

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません！')
    }
    item.status = ItemStatus.SOLD_OUT;
    await this.itemRepository.save(item)
    return item
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません！')
    }
    await this.itemRepository.delete({id});
  }
}
