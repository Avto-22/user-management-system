export interface User {
  id: number;
  name: string;
  age: number;
  salary: number | string;
  email: string;
  phone: number;
  workplace: string;
  avatar: string;
  dynamicFields: any[];
  logChanges: LogChange[];
}

export interface UsersResponse {
  users: User[];
  page: number;
  totalRecords: number;
}

export interface UserProfile {
  avatar: string;
  id: number;
}

export interface UsersStateInterface {
  usersData: UsersResponse;
  user: User | undefined;
  loading: boolean;
  error: string;
}

export interface LogChange {
  changeName: string;
  changeType: LogChangeType,
  changeDate: Date;
}

export enum LogChangeType{
  added,
  removed,
  edited,
  created
}

export enum LogChangeStatus{
  added = 'დამატება',
  removed = 'წაშლა',
  edited = 'ედიტირება',
  created = 'შექმნა'
}