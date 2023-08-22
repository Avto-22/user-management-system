import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersHttp } from 'src/app/services/http-services/users.service';
import { UsersActions, UsersApiActions } from '../actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersHttp: UsersHttp,
  ) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap(({ page, perPage, searchQuery }) =>
        this.usersHttp.getUsers(page, perPage, searchQuery).pipe(
          map((usersData) => UsersApiActions.getUsersSuccessFul({ usersData })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersApiActions.getUsersFailed({
                error: `Filed to get users!: Server responded with: ${error}`,
              }),
            ),
          ),
        ),
      ),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUser),
      mergeMap(({ uid }) =>
        this.usersHttp.getUser(uid).pipe(
          map((user) => UsersApiActions.getUserSuccessFul({ user })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersApiActions.getUserFailed({
                error: `Filed to get user!: Server responded with: ${error}`,
              }),
            ),
          ),
        ),
      ),
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.createUser),
      mergeMap(({ user }) =>
        this.usersHttp.createUser(user).pipe(
          map((userRes) =>
            UsersApiActions.createUserSuccessFul({ user: userRes }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersApiActions.createUserFailed({
                error: `Filed to create user!: Server responded with: ${error}`,
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap(({ user }) =>
        this.usersHttp.updateUser(user).pipe(
          map((userRes) =>
            UsersApiActions.updateUserSuccessFul({ user: userRes }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersApiActions.updateUserFailed({
                error: `Filed to update user!: Server responded with: ${error}`,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ id }) =>
        this.usersHttp.deleteUser(id).pipe(
          map(() => UsersApiActions.deleteUserSuccessFul({ userId: id })),
          catchError((error: HttpErrorResponse) =>
            of(
              UsersApiActions.deleteUserFailed({
                error: `Filed to delete user!: Server responded with: ${error}`,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
