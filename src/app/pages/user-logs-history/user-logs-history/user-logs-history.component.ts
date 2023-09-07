import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, delay, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/models/users-dashboard.model';
import { LogsHistoryService } from 'src/app/services/logs-history.service';
import { UsersSelectors } from '../../../store/selectors';
import { UsersActions } from '../../../store/actions';

@Component({
  selector: 'app-user-logs-history',
  templateUrl: './user-logs-history.component.html',
  styleUrls: ['./user-logs-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLogsHistoryComponent implements OnInit, OnDestroy {
  userId = +this.route.snapshot.params['uid'];

  user$!: Observable<User | undefined>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logsHistoryService: LogsHistoryService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initUser();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.logsHistoryService.logHistory = { isOpen: false, userId: NaN };
  }

  initUser() {
    this.user$ = this.store.select(UsersSelectors.selectUser).pipe(
      tap((user) => {
        this.logsHistoryService.logHistory = {
          isOpen: true,
          userId: user?.id || NaN,
        };
        if (!user?.hasOwnProperty('id')) {
          this.back();
        }
      }),
    );
  }

  getUser() {
    this.logsHistoryService.isLogHistoryFromUsersPage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (!status) {
          this.store.dispatch(UsersActions.getUser({ uid: this.userId }));
        }
      });
  }

  back() {
    this.logsHistoryService.logHistory = { isOpen: false, userId: NaN };
    this.router.navigate([{ outlets: { logsHistory: null } }]);
  }
}
