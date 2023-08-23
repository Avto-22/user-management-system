import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/users-dashboard.model';

export const getUsers = createAction(
  '[Users Page] get users',
  props<{ page?: number; perPage?: number; searchQuery?: string }>(),
);

export const getUser = createAction(
  '[Users Page] get user',
  props<{ uid: number }>(),
);

export const createUser = createAction(
  '[Users Page] create user',
  props<{ user: User }>(),
);

export const updateUser = createAction(
  '[Users Page] update user',
  props<{ user: User }>(),
);

export const deleteUser = createAction(
  '[Users Page] delete user',
  props<{ id: number }>(),
);
