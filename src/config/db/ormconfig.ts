import { DataSource } from "typeorm";

const source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: [
      'src/entities/*.entity.ts' // エンティティソースコード
  ],
  migrations: [
      'src/migrations/*.ts' // マイグレーションスクリプトの格納場所
  ],
})

export default source