import { ConfigService } from './../../@core/services/config.service';
import { Component } from '@angular/core';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { HOME } from 'src/app/@core/components/header/header.constants';

@Component({
  selector: 'blog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading: boolean;

  content = [{
    "image": "./assets/img/resources/main.jpg",
    "title": "home.details.profile",
    "description": "home.details.profile",
    "route": "/resources",
  },
  {
    "image": "./assets/img/resources/main.jpg",
    "title": "home.details.profile",
    "description": "home.details.profile",
    "route": "/resources",
  }]

  constructor(config: ConfigService, private translateService: TranslateConfigService) {
    config.updateDataSubject(HOME);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
