export interface User {
  id: number;
  name: string;
  age: number;
  salary: number | string;
  email: string;
  phone: number;
  workplace: string;
  avatar: string;
}

export interface UsersResponse {
  users: User[];
  page: number;
  totalRecords: number;
}
