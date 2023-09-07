import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  languages: any[] = [
    { label: 'ENG', value: 'en' },
    { label: 'GEO', value: 'ge' },
  ];
  language: 'en' | 'ge' = this.storageService.getFromLocal('language') || this.translateService.defaultLang;

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.translateService.use(this.language);
  }

  onChange() {
    this.translateService.use(this.language);
    this.storageService.saveToLocal({ language: this.language });
  }
}
