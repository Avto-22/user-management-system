import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @ViewChild('table') table!: Table;

  isLoading: boolean = false;

  users!: User[];

  currentPage: number = 1;
  totalRecords!: number;
  loading!: boolean;
  globalFilter!: string;

  perPageData = [
    { name: 'per Page 10', value: 10 },
    { name: 'per Page 50', value: 50 },
    { name: 'per Page 100', value: 100 },
  ];

  perPage = this.perPageData[0];

  cols = [
    { field: 'workplace', header: 'Workplace' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
  ];

  constructor(
    private usersHttp: UsersHttp,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.usersHttp.getUsers().subscribe((res) => console.log(res));
    // this.usersHttp.checkEmailTaken('avtandilkinchikaidze@gmail.com').subscribe(res => console.log(res))
  }

  loadUsersLazy(event: any = undefined) {
    this.currentPage = event?.first / event?.rows + 1 || this.currentPage || 1;
    this.globalFilter = event?.filters?.global?.value || '';

    this.usersHttp
      .getUsers(this.currentPage, this.perPage.value, this.globalFilter)
      .subscribe((res) => {
        this.users = res.users;
        this.totalRecords = res.totalRecords;
        this.cdr.markForCheck();
      });
  }

  filterGlobal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, 'contains');
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.loadUsersLazy();
  }

  delete() {}
}
