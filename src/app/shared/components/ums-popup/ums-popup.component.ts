import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ScrollActions } from 'src/app/utility';

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
    ScrollActions.disableScroll();
  }

  ngOnDestroy(): void {
    ScrollActions.undisableScroll();
  }

  closePopup() {
    this.close.emit();
  }
}
