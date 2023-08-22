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

  get logHistory$(): Observable<LogsHistoryStatus> {
    return this.logHistory_.asObservable();
  }

  set logHistory(status: LogsHistoryStatus) {
    this.logHistory_.next(status);
  }
  constructor() {}
}
