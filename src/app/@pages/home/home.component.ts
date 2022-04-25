import { ConfigService } from './../../@core/services/config.service';
import { Component } from '@angular/core';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { HOME } from 'src/app/@core/components/header/header.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  content = [{
    "image": "./assets/img/profile_horizontal.jpg",
    "title": "home.details.profile.title",
    "description": "home.details.profile.content",
    "route": "/profile",
  },
  {
    "image": "./assets/img/resources/main.jpg",
    "title": "home.details.resources.title",
    "description": "home.details.resources.content",
    "route": "/resources",
  },
  {
    "image": "./assets/img/resources/main.jpg",
    "title": "home.details.diary.title",
    "description": "home.details.diary.content",
    "route": "/diary",
  }]

  constructor(config: ConfigService, 
    private translateService: TranslateConfigService,
    private router: Router) {
    config.updateDataSubject(HOME);
  }
}
