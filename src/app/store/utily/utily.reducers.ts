import { User } from 'src/app/models/users-dashboard.model';

export function getUpdatedUsers(
  action: 'updateUser' | 'deleteUser',
  users: User[],
  userId: number,
  updatedUser?: User,
): User[] {
  switch (action) {
    case 'updateUser':
      return users.map((user) => {
        if (user.id === userId) {
          return updatedUser as User;
        }
        return user;
      });
    case 'deleteUser':
      return users.filter((user) => user.id !== userId);
    default:
      return [];
  }
}
