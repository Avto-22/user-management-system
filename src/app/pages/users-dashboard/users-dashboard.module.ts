import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDeatailComponent } from './user-profile-deatail/user-profile-deatail.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserProfileDeatailComponent,
  ],
  imports: [
    CommonModule,
    UsersDashboardRoutingModule,
    SharedModule,
    SpeedDialModule,
    TableModule,
    SidebarModule,
    SkeletonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    FileUploadModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    MessageService
  ]
})
export class UsersDashboardModule {}
