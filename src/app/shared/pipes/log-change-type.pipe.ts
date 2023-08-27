import { Pipe, PipeTransform } from '@angular/core';
import {
  LogChangeStatus,
  LogChangeType,
} from 'src/app/models/users-dashboard.model';

@Pipe({
  name: 'logChangeType',
})
export class LogChangeTypePipe implements PipeTransform {
  transform(changeType: LogChangeType): string {
    switch (changeType) {
      case LogChangeType.added:
        return LogChangeStatus.added;
      case LogChangeType.removed:
        return LogChangeStatus.removed;
      case LogChangeType.edited:
        return LogChangeStatus.edited;
      default:
        return '';
    }
  }
}
