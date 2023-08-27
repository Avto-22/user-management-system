import { UsersStateInterface } from 'src/app/models/users-dashboard.model';

export const UsersState: UsersStateInterface = {
  usersData: {
    users: [],
    page: 0,
    totalRecords: 0,
  },
  user: {
    id: 0,
    name: '',
    age: 0,
    salary: '',
    email: '',
    phone: 0,
    workplace: '',
    avatar: '',
    logChanges: [],
    dynamicFields: [],
  },
  loading: false,
  error: '',
};
