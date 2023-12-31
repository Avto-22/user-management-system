import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UsersResponse } from 'src/app/models/users-dashboard.model';
import { LogsHistoryService } from 'src/app/services/logs-history.service';
import { UsersActions } from '../../../store/actions';
import { UsersSelectors } from '../../../store/selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @ViewChild('table') table!: Table;

  isLoading$: Observable<boolean> = this.store.select(
    UsersSelectors.selectLoading,
  );

  usersData$: Observable<UsersResponse> = this.store.select(
    UsersSelectors.selectUsersData,
  );

  currentPage: number = 1;
  loading!: boolean;
  globalFilter!: string;

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'workplace', header: 'Workplace' },
    { field: 'salary', header: 'Salary' },
    { field: 'age', header: 'Age' },
    { field: 'phone', header: 'Phone' },
  ];

  constructor(
    private router: Router,
    public logsHistoryService: LogsHistoryService,
    private store: Store,
  ) {}

  loadUsersLazy(event: any = undefined) {
    this.currentPage = event?.first / event?.rows + 1 || this.currentPage || 1;
    this.globalFilter = event?.filters?.global?.value || '';

    this.store.dispatch(
      UsersActions.getUsers({
        page: this.currentPage,
        perPage: 10,
        searchQuery: this.globalFilter,
      }),
    );
  }

  filterGlobal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, 'contains');
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.loadUsersLazy();
  }

  delete(id: number) {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  navigateToLogs(id: number) {
    this.logsHistoryService.isLogHistoryFromUsersPage = true;
    this.store.dispatch(UsersActions.getUser({ uid: id }));
    this.router.navigate([{ outlets: { logsHistory: ['logs', id] } }]);
  }
}
