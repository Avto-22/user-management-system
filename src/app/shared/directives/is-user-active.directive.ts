import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[isUserActive]',
})
export class IsUserActiveDirective {
  @Input('isUserActive') set isUserActive(condition: boolean) {
    this.isActive = condition;
    if (this.isActive) {
      this.backgroundColor = 'rgba(0,0,0,.2)';
      this.cursor = null;
    } else {
      this.backgroundColor = null;
    }
  }

  isActive: boolean = false;

  @HostBinding('style.backgroundColor') backgroundColor: string | null = null;
  @HostBinding('style.cursor') cursor: string | null = null;

  constructor() {}

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isActive) return;
    this.backgroundColor = 'rgba(0,0,0,.1)';
    this.cursor = 'pointer';
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isActive) return;
    this.backgroundColor = null;
    this.cursor = null;
  }
}
