import { Body, Controller, Delete, Get, Param, Post, Patch, Put, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/auth/decorator/role.decorator';
import { UserStatus } from 'src/auth/user-status.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Intercepter: ハンドラの実行前後でロジックの追加をできるようにするもの
//              リクエストとハンドラの間、ハンドラとレスポンスの間で一度処理を奪い処理後に基の処理へ返す
// ClassSerializerInterceptor: ハンドラがレスポンスを返す前に処理（ここでは＠Exclude）を行う

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor) 
// @UseGuards(JwtAuthGuard) // ←Controller全体に適用する場合
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()  // /items
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id') // /items/id  (「:」は変数を示す)
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()   // /items
  @Role(UserStatus.PREMIUM)  // PREMIUMユーザのみ許可するデコレータを設定
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    console.log(user);
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')  // /items/id
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')  // /items/id
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
