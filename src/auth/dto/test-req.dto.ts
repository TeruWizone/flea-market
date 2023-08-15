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

type CondType =
  | 'EQ'
  | 'NE'
  | 'LIKE'
  | 'LIKE_FORWARD'
  | 'LIKE_BACKWARD'
  | 'NOT_LIKE'
  | 'NOT_LIKE_FORWARD'
  | 'NOT_LIKE_BACKWARD'
  | 'LT'
  | 'LE'
  | 'GT'
  | 'GE';

type CondOpe = 'AND' | 'OR' | '';

export class TestConditionDto {
  idx: number;
  keyName: string;
  conditionType: CondType;
  conditionValue: string;
  conditionOperator: CondOpe;
}

export class TestSearchHistoryDto {
  title: string;
  searchDateFrom: string;
  searchDateTo: string;
  data: TestConditionDto[];
}
