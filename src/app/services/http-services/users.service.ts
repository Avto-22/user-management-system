import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User, UsersResponse } from 'src/app/models/users-dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class UsersHttp {
  constructor(private api: ApiService) {}

  getUsers(page?: number, perPage?: number, searchQuery?: string): Observable<UsersResponse> {
    return this.api.get<UsersResponse>('/users', {page, perPage, searchQuery});
  }

  checkEmailTaken(email: string): Observable<boolean> {
    return this.api.get<boolean>(`/check-email/${email}`);
  }

  getUser(uid: number): Observable<User>{
    return this.api.get<User>(`/user/${uid}`)
  }

  createUser(user: User): Observable<User>{
    return this.api.post<User>('/users', user)
  }
}
