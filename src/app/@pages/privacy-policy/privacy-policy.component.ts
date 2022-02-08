import { Component, OnInit } from '@angular/core';
import { PRIVACY_POLICY } from 'src/app/@core/components/header/header.constants';
import { ConfigService } from 'src/app/@core/services/config.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit{

  constructor(private config: ConfigService, private translateService: TranslateConfigService) {
  }

  ngOnInit() {
    this.config.updatebgUrlSubject(PRIVACY_POLICY.bg);
    this.config.updateTitleSubject(PRIVACY_POLICY.title);
    this.config.updateButtonTitleSubject(PRIVACY_POLICY.button);
  }
}
