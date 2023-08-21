import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileDeatailComponent } from './user-profile-deatail/user-profile-deatail.component';
import { UserResolver } from 'src/app/core/resolvers/user-resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [
      {
        path: 'edit-user/:uid',
        resolve: {user: UserResolver},
        component: UserProfileDeatailComponent,
      },
      {
        path: 'add-user',
        component: UserProfileDeatailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDashboardRoutingModule {}
