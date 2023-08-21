import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLogsHistoryRoutingModule } from './user-logs-history-routing.module';
import { UserLogsHistoryComponent } from './user-logs-history/user-logs-history.component';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [
    UserLogsHistoryComponent
  ],
  imports: [
    CommonModule,
    UserLogsHistoryRoutingModule,
    SidebarModule
  ]
})
export class UserLogsHistoryModule { }
