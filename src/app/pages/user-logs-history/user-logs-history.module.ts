import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLogsHistoryRoutingModule } from './user-logs-history-routing.module';
import { UserLogsHistoryComponent } from './user-logs-history/user-logs-history.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [UserLogsHistoryComponent],
  imports: [
    CommonModule,
    UserLogsHistoryRoutingModule,
    TooltipModule,
    ButtonModule
  ],
})
export class UserLogsHistoryModule {}
