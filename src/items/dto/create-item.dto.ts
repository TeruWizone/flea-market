// DTOはクラスバリデータを用いるためにclassで定義する。
// 定義したらコントローラーで使う。
// コントローラで＠Bodyデコレータで受け取っていたが、
// これを用いて一つの@Bodyデコレータで受け取れる。

// Validatorの適用
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'IZONEスマフォケース', description: 'Product name.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: '1200',
    description: 'Price.',
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: 'IZONE special edition smartphone case for WIZONE of world.',
    description: 'Description of product.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
