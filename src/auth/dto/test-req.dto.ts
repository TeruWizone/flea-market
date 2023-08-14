type Role = 'USER' | 'ADMIN';

export class TestSignUpDto {
  username: string;
  password: string;
  role: Role;
}

export class TestChangeRoleDto {
  role: Role;
}

export class TestChangePasswordDto {
  password: string;
}

type KeyType = 'TEXT' | 'INT';

export class TestJsonKeyDto {
  idx: string;
  keyName: string;
  keyType: KeyType;
}
