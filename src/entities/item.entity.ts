import { ItemStatus } from "../items/item-status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
