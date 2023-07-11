import { Item } from '../entities/item.entity';
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';

//@EntityRepository(Item)
@Injectable()
export class ItemRepository extends Repository<Item> {
  constructor(private dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.create({
      name: name,
      price: price,
      description: description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(), 
    }); 

    await this.save(item);

    return item;
  }
}
