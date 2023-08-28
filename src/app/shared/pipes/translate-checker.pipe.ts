import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateChecker',
})
export class TranslateCheckerPipe implements PipeTransform {
  transform(value: string, key: string = ''): string {
    const isValidKey: boolean = value.toLowerCase() !== key.toLowerCase() ? true : false;
    return isValidKey ? value : key;
  }
}
