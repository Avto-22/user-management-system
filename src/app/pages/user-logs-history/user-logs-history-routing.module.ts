import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogsHistoryComponent } from './user-logs-history/user-logs-history.component';

const routes: Routes = [
  {
    path: '',
    component: UserLogsHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogsHistoryRoutingModule { }
