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

export type CondType =
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

export type CondOpe = 'AND' | 'OR' | '';

export type TestCondition = {
  idx: number;
  keyName: string;
  conditionType: CondType;
  conditionValue: string;
  conditionOperator: CondOpe;
};

export type TestSearchHistory = {
  id: string;
  title: string;
  searchDateFrom: string;
  searchDateTo: string;
  data: TestCondition[];
};
