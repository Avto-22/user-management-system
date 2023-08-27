import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsUserActiveDirective } from './directives/is-user-active.directive';
import { UmsPopupComponent } from './components/ums-popup/ums-popup.component';
import { ChangeFormDetectorPipe } from './pipes/change-form-detector.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { LogChangeTypePipe } from './pipes/log-change-type.pipe';

@NgModule({
  declarations: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
    LogChangeTypePipe,
  ],
  providers: [ChangeFormDetectorPipe],
  imports: [CommonModule, ProgressBarModule],
  exports: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
    LogChangeTypePipe
  ],
})
export class SharedModule {}
