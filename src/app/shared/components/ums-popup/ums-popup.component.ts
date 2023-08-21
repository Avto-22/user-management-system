import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ums-popup',
  templateUrl: './ums-popup.component.html',
  styleUrls: ['./ums-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UmsPopupComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() position: 'center' | 'start' = 'center';

  constructor() {}

  ngOnInit(): void {
    this.disableScroll();
  }

  ngOnDestroy(): void {
    this.undisableScroll();
  }

  closePopup() {
    this.close.emit();
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  undisableScroll() {
    document.body.style.overflow = 'auto';
  }
}
