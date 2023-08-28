import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToLocal(obj: any) {
    Object.keys(obj).forEach((key) => {
      localStorage.setItem(key, obj[key]);
    });
  }

  getFromLocal(key: string): any {
    return localStorage.getItem(key);
  }
}
