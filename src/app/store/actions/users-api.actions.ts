import { createAction, props } from '@ngrx/store';
import { User, UsersResponse } from 'src/app/models/users-dashboard.model';

export const getUsersSuccessFul = createAction(
  '[Users Page] get users Successful',
  props<{ usersData: UsersResponse }>(),
);

export const getUsersFailed = createAction(
  '[Users Page] get users Failed',
  props<{ error: string }>(),
);

export const getUserSuccessFul = createAction(
  '[Users Page] get user Successful',
  props<{ user: User }>(),
);

export const getUserFailed = createAction(
  '[Users Page] get user Failed',
  props<{ error: string }>(),
);

export const createUserSuccessFul = createAction(
  '[Users Page] create user Successful',
  props<{ user: User }>(),
);

export const createUserFailed = createAction(
  '[Users Page] create user Failed',
  props<{ error: string }>(),
);

export const updateUserSuccessFul = createAction(
  '[Users Page] update user Successful',
  props<{ user: User }>(),
);

export const updateUserFailed = createAction(
  '[Users Page] update user Failed',
  props<{ error: string }>(),
);

export const deleteUserSuccessFul = createAction(
  '[Users Page] delete user Successful',
  props<{ userId: number }>(),
);

export const deleteUserFailed = createAction(
  '[Users Page] delete user Failed',
  props<{ error: string }>(),
);
