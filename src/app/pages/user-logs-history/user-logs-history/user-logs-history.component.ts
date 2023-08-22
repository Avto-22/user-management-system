import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';
import { LogsHistoryService } from 'src/app/services/logs-history.service';

@Component({
  selector: 'app-user-logs-history',
  templateUrl: './user-logs-history.component.html',
  styleUrls: ['./user-logs-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLogsHistoryComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersHttp: UsersHttp,
    private logsHistoryService: LogsHistoryService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((res: any) => {
        const userId: number = +res.params['uid'];
        this.logsHistoryService.logHistory = { isOpen: true, userId };
        return this.usersHttp.getUser(userId).pipe(
          tap((user) => {
            if (!user.hasOwnProperty('id')) {
              this.back();
            }
          }),
        );
      }),
    );
  }

  ngOnDestroy(): void {
    this.logsHistoryService.logHistory = { isOpen: false, userId: NaN };
  }

  back() {
    this.logsHistoryService.logHistory = { isOpen: false, userId: NaN };
    this.router.navigate([{ outlets: { logsHistory: null } }]);
  }
}
