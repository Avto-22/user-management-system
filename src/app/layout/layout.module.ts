import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_MODULES } from '../shared/primeng.module';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [LoadingComponent, HeaderComponent],
  imports: [CommonModule, PRIMENG_MODULES],
  exports: [LoadingComponent, HeaderComponent],
})
export class LayoutModule {}
