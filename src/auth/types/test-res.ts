export type Role = 'USER' | 'ADMIN';

export type TestUser = {
  id: string;
  username: string;
  password: string;
  role: Role;
};

export type JsonKey = 'TEXT' | 'INT';

export type TestJsonKey = {
  idx: string;
  keyName: string;
  keyType: KeyType;
};
