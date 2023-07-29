import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity'; // modelからDBのEntityへ変更
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
//import { ItemRepository } from './item.repository';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    //private readonly itemRepository: ItemRepository
    // Repositoryファイルで分けない書き方
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  //private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find(); // 全件取得
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOneBy({ id }); // 条件取得
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  //async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
  //  return await this.itemRepository.createItem(createItemDto, user);
  //}
  // Repositoryファイルで分けない書き方
  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.itemRepository.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      user,
    });

    await this.itemRepository.save(item);
    return item;
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません！');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updateAt = new Date().toISOString();
    const updatedItem = await this.itemRepository.update(id, {
      status: item.status,
      updateAt: item.updateAt,
    });
    if (updatedItem.affected === 0) {
      throw new NotFoundException(`${id}のデータを更新できませんでした`);
    }
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません！');
    }
    await this.itemRepository.delete({ id });
  }
}
