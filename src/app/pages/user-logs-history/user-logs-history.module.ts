import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLogsHistoryRoutingModule } from './user-logs-history-routing.module';
import { UserLogsHistoryComponent } from './user-logs-history/user-logs-history.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserLogsHistoryComponent],
  imports: [
    CommonModule,
    UserLogsHistoryRoutingModule,
    TooltipModule,
    ButtonModule,
    SkeletonModule,
    SharedModule
  ],
})
export class UserLogsHistoryModule {}
