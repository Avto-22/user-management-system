import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogsHistoryStatus } from '../models/logs-history.model';

@Injectable({
  providedIn: 'root',
})
export class LogsHistoryService {
  private logHistory_: BehaviorSubject<LogsHistoryStatus> =
    new BehaviorSubject<LogsHistoryStatus>({
      isOpen: false,
      userId: NaN,
    });

  private isLogHistoryFromUsersPage_: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get isLogHistoryFromUsersPage$(): Observable<boolean> {
    return this.isLogHistoryFromUsersPage_.asObservable();
  }

  get logHistory$(): Observable<LogsHistoryStatus> {
    return this.logHistory_.asObservable();
  }

  set isLogHistoryFromUsersPage(status: boolean) {
    this.isLogHistoryFromUsersPage_.next(status);
  }

  set logHistory(status: LogsHistoryStatus) {
    this.logHistory_.next(status);
  }
  constructor() {}
}
