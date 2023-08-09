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
