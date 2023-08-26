import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeFormDetector',
})
export class ChangeFormDetectorPipe implements PipeTransform {
  transform(firstForm: any, secondForm: any): boolean {
    return this.isFormChanged(firstForm, secondForm);
  }

  private isFormChanged(firstValue: any, secondValue: any): boolean {
    if (Array.isArray(firstValue)) {
      return this.compareArray(firstValue, secondValue);
    }

    if (typeof firstValue === 'object' && typeof secondValue === 'object') {
      for (const key in firstValue) {
        if (firstValue.hasOwnProperty(key)) {
          if (this.isFormChanged(firstValue[key], secondValue[key])) {
            return true;
          }
        }
      }
    } else if (firstValue !== secondValue) {
      return true;
    }

    return false;
  }

  private compareArray(firstArray: any[], secondArray: any[]): boolean {
    if (firstArray.length !== secondArray.length) {
      return true;
    }

    for (let i = 0; i < firstArray.length; i++) {
      if (this.isFormChanged(firstArray[i], secondArray[i])) {
        return true;
      }
    }

    return false;
  }
}
