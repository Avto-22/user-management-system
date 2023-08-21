import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
