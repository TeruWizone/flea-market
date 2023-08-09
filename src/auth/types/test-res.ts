export type TestUser = {
  id: string;
  username: string;
  password: string;
  role: Role;
};

export type Role = 'USER' | 'ADMIN';
