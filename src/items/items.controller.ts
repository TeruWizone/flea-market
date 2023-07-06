import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model'
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {

  }
  @Get()  // /items
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id') // /items/id  (「:」は変数を示す)
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()   // /items
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string, 
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    };

    return this.itemsService.create(item);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.itemsService.delete(id);
  }
}
