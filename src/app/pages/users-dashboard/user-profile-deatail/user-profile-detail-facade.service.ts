import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LogChange,
  LogChangeType,
  User,
} from 'src/app/models/users-dashboard.model';

@Injectable()
export class UserProfileDetailFacadeService {
  constructor() {}

  calculateLogChanges(editUser: User, documentForm: FormGroup): LogChange[] {
    editUser.logChanges = editUser.logChanges || [];
    let changes: LogChange[] = [...editUser.logChanges];
    Object.keys(editUser).forEach((key: any) => {
      if (key === 'dynamicFields') {
        if (
          editUser.dynamicFields.length >
          documentForm.value.dynamicFields.length
        ) {
          changes = this.getLogChanges(
            LogChangeType.removed,
            editUser.dynamicFields[editUser.dynamicFields.length - 1].name,
            changes,
          );
        } else if (
          editUser.dynamicFields.length <
          documentForm.value.dynamicFields.length
        ) {
          changes = this.getLogChanges(
            LogChangeType.added,
            documentForm.value.dynamicFields[
              documentForm.value.dynamicFields.length - 1
            ].name,
            changes,
          );
        } else {
          documentForm.value.dynamicFields.forEach(
            (res: any, index: number) => {
              if (typeof res === 'object') {
                if (
                  Object.values(res).join('') !==
                  Object.values(editUser.dynamicFields[index]).join('')
                ) {
                  changes = this.getLogChanges(
                    LogChangeType.edited,
                    documentForm.value.dynamicFields[index].name,
                    changes,
                  );
                }
              }
            },
          );
        }
      } else if ((editUser as any)[key] !== documentForm.value[key]) {
        changes = this.getLogChanges(LogChangeType.edited, key, changes);
      }
    });
    return changes;
  }

  getLogChanges(
    changeType: LogChangeType,
    changeName: string,
    changes: LogChange[],
  ) {
    changes = changes.filter((change) => change.changeName !== changeName);

    return [
      {
        changeDate: new Date(),
        changeName,
        changeType,
      },
      ...changes,
    ];
  }
}
