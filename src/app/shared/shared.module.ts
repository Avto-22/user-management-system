import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsUserActiveDirective } from './directives/is-user-active.directive';
import { UmsPopupComponent } from './components/ums-popup/ums-popup.component';
import { ChangeFormDetectorPipe } from './pipes/change-form-detector.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { LogChangeTypePipe } from './pipes/log-change-type.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateCheckerPipe } from './pipes/translate-checker.pipe';

@NgModule({
  declarations: [
    IsUserActiveDirective,
    UmsPopupComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
    LogChangeTypePipe,
    HeaderComponent,
    TranslateCheckerPipe,
  ],
  providers: [ChangeFormDetectorPipe],
  imports: [
    CommonModule,
    ProgressBarModule,
    SelectButtonModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    IsUserActiveDirective,
    UmsPopupComponent,
    HeaderComponent,
    ChangeFormDetectorPipe,
    LoadingComponent,
    LogChangeTypePipe,
    TranslateModule,
    TranslateCheckerPipe
  ],
})
export class SharedModule {}
