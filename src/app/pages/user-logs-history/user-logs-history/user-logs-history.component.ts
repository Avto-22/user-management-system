import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';

@Component({
  selector: 'app-user-logs-history',
  templateUrl: './user-logs-history.component.html',
  styleUrls: ['./user-logs-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLogsHistoryComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersHttp: UsersHttp,
  ) {}
  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((res: any) => {
        return this.usersHttp.getUser(res.params['uid']);
      }),
    );
  }
}
