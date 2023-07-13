import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  status: string;

  // リレーション用
  //   ユーザは複数のアイテムを持つことができる(User:Item = 1:many)
  // OneToMany()引数：関連先の型と、関連先で紐づけられるプロパティを返すコールバック関数を指定
  @OneToMany(() => Item, (item) => item.user) 
  items: Item[];
}