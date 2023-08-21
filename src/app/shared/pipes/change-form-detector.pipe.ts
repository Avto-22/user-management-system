import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeFormDetector',
})
export class ChangeFormDetectorPipe implements PipeTransform {
  transform(firstForm: any, secondForm: any): boolean {
    let isFormChanged: boolean = false;
    Object.keys(firstForm).forEach((key) => {
      if (firstForm[key] !== secondForm[key]) {
        isFormChanged = true;
      }
    });
    return isFormChanged;
  }
}
