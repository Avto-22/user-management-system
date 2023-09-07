import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsUserActiveDirective } from './directives/is-user-active.directive';
import { UmsPopupComponent } from './components/ums-popup/ums-popup.component';
import { ChangeFormDetectorPipe } from './pipes/change-form-detector.pipe';
import { LogChangeTypePipe } from './pipes/log-change-type.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateCheckerPipe } from './pipes/translate-checker.pipe';
import { PRIMENG_MODULES } from './primeng.module';

@NgModule({
  declarations: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LogChangeTypePipe,
    TranslateCheckerPipe,
  ],
  providers: [ChangeFormDetectorPipe],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    TranslateCheckerPipe,
    LogChangeTypePipe,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULES
  ],
})
export class SharedModule {}
