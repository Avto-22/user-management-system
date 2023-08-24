import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { User, UsersResponse } from 'src/app/models/users-dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class UsersHttp {
  constructor(private api: ApiService) {}

  getUsers(
    page?: number,
    perPage?: number,
    searchQuery?: string,
  ): Observable<UsersResponse> {
    return this.api.get<UsersResponse>('/users', {
      page,
      perPage,
      searchQuery,
    });
  }

  checkEmailTaken(email: string, uid: number | undefined): Observable<boolean> {
    return this.api.get<boolean>(`/check-email/${email}/${uid}`);
  }

  checkNameTaken(email: string, uid: number | undefined): Observable<boolean> {
    return this.api.get<boolean>(`/check-name/${email}/${uid}`);
  }

  getUser(uid: number): Observable<User> {
    return this.api.get<User>(`/user/${uid}`);
  }

  createUser(user: User): Observable<User> {
    return this.api.post<User>('/users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.api.put<User>(`/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`/users/${id}`);
  }
}
