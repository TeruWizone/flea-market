module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true, // Entity追加毎にTypeORMへの登録を自動で行う
    
  entities: ['dist/entities/*.entity.js'], // マイグレーション用設定：読み込む場所はコンパイル済のdistから読み込む
  migrations: ['dist/migrations/*.js'], // マイグレーションを行う時のマイグレーションファイルの指定
  cli: {        // CLIによって作成される場合の出力先を指定
    entitiesDir: 'src/entities',
    migratinsDir: 'src/migrations',
  },
};