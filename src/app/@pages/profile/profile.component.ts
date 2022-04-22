import { ConfigService } from '../../@core/services/config.service';
import { Component } from '@angular/core';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { PROFILE } from 'src/app/@core/components/header/header.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(config: ConfigService, private translateService: TranslateConfigService) {
    config.updateDataSubject(PROFILE);
  }
}
