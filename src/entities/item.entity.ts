import { ItemStatus } from "../items/item-status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid') // uuid採番。指定しない場合は連番。
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;
    
  @Column()
  createdAt: string;

  @Column()
  updateAt: string;

  // リレーション用
  @ManyToOne(() => User, (user) => user.items)
  user: User;
  
  // 上記の追加でItemにuserIdというカラムが追加されリレーションが設定される
  // userIdはfindByIdなので取得ができない
  // 以下の追加が必要になる（＆再度Migration）
  // Migration前にtruncateが必要
  @Column()
  userId: string;
}
