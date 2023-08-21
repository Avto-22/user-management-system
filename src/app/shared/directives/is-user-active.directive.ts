import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[isUserActive]',
})
export class IsUserActiveDirective {
  @Input('isUserActive') set isUserActive(condition: boolean) {
    if (condition) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'rgba(0,0,0,.4)',
      );
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
}
