import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserProfile } from 'src/app/models/users-dashboard.model';
import { ScrollActions } from 'src/app/utility';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @Output() onZoom: EventEmitter<number> = new EventEmitter<number>();
  @Input() userProfile!: UserProfile;

  zoomImage: boolean = false;

  closeProfile() {
    this.zoomImage = false;
    ScrollActions.undisableScroll();
  }

  onZoomImage(event: Event) {
    event.stopPropagation();
    if (this.zoomImage) return;
    this.onZoom.emit(this.userProfile.id);
    this.zoomImage = true;
    ScrollActions.disableScroll();
  }
}
