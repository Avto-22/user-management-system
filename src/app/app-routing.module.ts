import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users-dashboard/users-dashboard.module').then(
        (m) => m.UsersDashboardModule,
      ),
  },

  {
    path: 'logs/:uid',
    outlet: 'logsHistory',
    loadChildren: () =>
      import('./pages/user-logs-history/user-logs-history.module').then(
        (m) => m.UserLogsHistoryModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
