// DTOはクラスバリデータを用いるためにclassで定義する。
// 定義したらコントローラーで使う。
// コントローラで＠Bodyデコレータで受け取っていたが、
// これを用いて一つの@Bodyデコレータで受け取れる。

// Validatorの適用
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
