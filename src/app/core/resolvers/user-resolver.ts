import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
  constructor(private usersHttp: UsersHttp) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<User>
    | Observable<Observable<User>>
    | Promise<Observable<User>> {
    const uid = route.params['uid'];
    return this.usersHttp.getUser(uid);
  }
}
