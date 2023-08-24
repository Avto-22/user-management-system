export interface User {
  id: number;
  name: string;
  age: number;
  salary: number | string;
  email: string;
  phone: number;
  workplace: string;
  avatar: string;
  isActive?: boolean;
  dynamicFields?: any[];
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
