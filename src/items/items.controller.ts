import { Body, Controller, Delete, Get, Param, Post, Patch, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model'
import { CreateItemDto } from './dto/create-item.dto'
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {

  }
  @Get()  // /items
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id') // /items/id  (「:」は変数を示す)
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()   // /items
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.itemsService.delete(id);
  }
}
