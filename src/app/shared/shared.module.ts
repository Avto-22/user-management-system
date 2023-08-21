import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsUserActiveDirective } from './directives/is-user-active.directive';
import { UmsPopupComponent } from './components/ums-popup/ums-popup.component';
import { ChangeFormDetectorPipe } from './pipes/change-form-detector.pipe';

@NgModule({
  declarations: [IsUserActiveDirective, UmsPopupComponent, ChangeFormDetectorPipe],
  imports: [CommonModule],
  exports: [IsUserActiveDirective, UmsPopupComponent, ChangeFormDetectorPipe],
})
export class SharedModule {}
