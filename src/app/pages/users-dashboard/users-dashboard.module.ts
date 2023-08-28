import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDeatailComponent } from './user-profile-deatail/user-profile-deatail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileDetailFacadeService } from './user-profile-deatail/user-profile-detail-facade.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserProfileDeatailComponent,
  ],
  imports: [CommonModule, UsersDashboardRoutingModule, SharedModule],
  providers: [UserProfileDetailFacadeService, MessageService],
})
export class UsersDashboardModule {}
