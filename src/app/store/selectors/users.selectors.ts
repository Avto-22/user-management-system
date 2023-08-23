import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateInterface } from 'src/app/models/users-dashboard.model';

export const selectAddFriends =
  createFeatureSelector<UsersStateInterface>('users');

export const selectUsersData = createSelector(
  selectAddFriends,
  (state: UsersStateInterface) => state.usersData,
);

export const selectUser = createSelector(
  selectAddFriends,
  (state: UsersStateInterface) => state.user,
);

export const selectLoading = createSelector(
  selectAddFriends,
  (state: UsersStateInterface) => state.loading,
);

export const selectError = createSelector(
  selectAddFriends,
  (state: UsersStateInterface) => state.error,
);
