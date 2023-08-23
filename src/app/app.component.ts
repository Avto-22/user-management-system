import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { UsersSelectors } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'user-managment-system';

  loading$: Observable<boolean> = this.store.select(
    UsersSelectors.selectLoading,
  );

  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
