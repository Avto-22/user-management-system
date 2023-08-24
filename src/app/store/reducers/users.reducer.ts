import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../state/users.state';
import { UsersActions, UsersApiActions } from '../actions';
import { UtilReducers } from '../utily';

export const reducer = createReducer(
  UsersState,

  // ----------- GET USERS
  on(UsersActions.getUsers, (state) => ({ ...state, loading: true })),
  on(UsersApiActions.getUsersSuccessFul, (state, { usersData }) => ({
    ...state,
    loading: false,
    usersData,
  })),
  on(UsersApiActions.getUsersFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------- GET USER
  on(UsersActions.getUser, (state) => ({ ...state, logsHistoryLoading: true })),
  on(UsersApiActions.getUserSuccessFul, (state, { user }) => ({
    ...state,
    logsHistoryLoading: false,
    user,
  })),
  on(UsersApiActions.getUserFailed, (state, { error }) => ({
    ...state,
    logsHistoryLoading: false,
    error,
  })),

  // ----------- CREATE USER
  on(UsersActions.createUser, (state) => ({ ...state, loading: true })),
  on(UsersApiActions.createUserSuccessFul, (state, { user }) => ({
    ...state,
    loading: false,
    usersData: {
      ...state.usersData,
      totalRecords: state.usersData.totalRecords + 1,
      users: [...state.usersData.users, user],
    },
  })),
  on(UsersApiActions.createUserFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------- UPDATE USER
  on(UsersActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UsersApiActions.updateUserSuccessFul, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user: user.id === state.user?.id ? user : state.user,
      usersData: {
        ...state.usersData,
        users: UtilReducers.getUpdatedUsers(
          'updateUser',
          state.usersData.users,
          user.id,
          user,
        ),
      },
    };
  }),
  on(UsersApiActions.updateUserFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ----------- DELETE USER
  on(UsersActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UsersApiActions.deleteUserSuccessFul, (state, { userId }) => {
    return {
      ...state,
      loading: false,
      user: userId === state.user?.id ? undefined : state.user,
      usersData: {
        ...state.usersData,
        totalRecords: state.usersData.totalRecords - 1,
        users: UtilReducers.getUpdatedUsers(
          'deleteUser',
          state.usersData.users,
          userId,
        ),
      },
    };
  }),
  on(UsersApiActions.deleteUserFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
