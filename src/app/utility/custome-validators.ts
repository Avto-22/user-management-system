import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UsersHttp } from '../services/http-services/users.service';

export function emailChecker(usersHttp: UsersHttp, uid: number | undefined): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const email = control.value;
    const isEmailTaken = await usersHttp.checkEmailTaken(email, uid).toPromise()

    if (isEmailTaken) {
      return { isEmailAlreadyInUse: true };
    }

    return null;
  };
}
