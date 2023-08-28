import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicField,
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
          changes = this.getRemovedOrAddedChanges(
            LogChangeType.removed,
            editUser.dynamicFields,
            documentForm.value['dynamicFields'],
            changes,
          );
        } else if (
          editUser.dynamicFields.length <
          documentForm.value.dynamicFields.length
        ) {
          changes = this.getRemovedOrAddedChanges(
            LogChangeType.added,
            editUser.dynamicFields,
            documentForm.value['dynamicFields'],
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
                  changes = this.getEditedCHanges(
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
        changes = this.getEditedCHanges(LogChangeType.edited, key, changes);
      }
    });
    return changes;
  }

  getEditedCHanges(
    changeType: LogChangeType,
    changeName: string,
    changes: LogChange[],
  ): LogChange[] {
    changes = changes?.filter((change) => change.changeName !== changeName);

    return [
      {
        changeDate: new Date(),
        changeName,
        changeType,
      },
      ...(changes as Array<any>),
    ];
  }

  getRemovedOrAddedChanges(
    changeType: LogChangeType,
    previousValues: DynamicField[],
    currentValues: DynamicField[],
    changes: LogChange[],
  ): LogChange[] {
    const changedValues: LogChange[] = (
      changeType === LogChangeType.removed
        ? previousValues.filter(
            (res) => !currentValues.some((value) => value.name === res.name),
          )
        : currentValues.filter(
            (res) => !previousValues.some((value) => value.name === res.name),
          )
    ).map((res) => ({
      changeDate: new Date(),
      changeType,
      changeName: res.name,
    }));

    changes = changes.filter(res => !changedValues.some(value => res.changeName === value.changeName))

    return [...changedValues, ...changes];
  }
}
