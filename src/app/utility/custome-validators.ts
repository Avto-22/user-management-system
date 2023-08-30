import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UsersHttp } from '../services/http-services/users.service';

export function emailOrNameChecker(
  usersHttp: UsersHttp,
  uid: number | undefined,
  type: 'email' | 'name',
): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const controler = control.value;
    const isControlerTaken =
      type === 'email'
        ? await usersHttp.checkEmailTaken(controler, uid).toPromise()
        : await usersHttp.checkNameTaken(controler, uid).toPromise();

    if (isControlerTaken) {
      if (type === 'email') {
        return { isEmailAlreadyInUse: true };
      }
      return { isNameAlreadyInUse: true };
    }

    return null;
  };
}
