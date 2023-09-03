import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UsersHttp } from '../services/http-services/users.service';
import { Observable, map } from 'rxjs';

export function emailOrNameChecker(
  usersHttp: UsersHttp,
  uid: number | undefined,
  type: 'email' | 'name',
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const controler = control.value;
    return type === 'email'
      ? mappedChekerRequest$({ isEmailAlreadyInUse: true }, usersHttp.checkEmailTaken(controler, uid))
      : mappedChekerRequest$({ isNameAlreadyInUse: true }, usersHttp.checkNameTaken(controler, uid))
  };
}

function mappedChekerRequest$(errorMessage: Object, obs$: Observable<boolean>): Observable<ValidationErrors | null>{
  return obs$.pipe(map(res => {
    if(res){
      return errorMessage
    }
    return null
  }))
}