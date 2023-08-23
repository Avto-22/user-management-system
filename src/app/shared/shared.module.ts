import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsUserActiveDirective } from './directives/is-user-active.directive';
import { UmsPopupComponent } from './components/ums-popup/ums-popup.component';
import { ChangeFormDetectorPipe } from './pipes/change-form-detector.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
  ],
  imports: [CommonModule, ProgressBarModule],
  exports: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
  ],
})
export class SharedModule {}
