import { Component } from '@angular/core';
import { RESOURCES } from 'src/app/@core/components/header/header.constants';
import { ConfigService } from 'src/app/@core/services/config.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';

@Component({
  selector: 'blog-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {

  resourcesTypes = [
    {
      name: "resources.companions.name",
      description: "resources.companions.description",
      image: "/assets/img/resources/companions.jpg",
      route: "./companions"
    },
    {
        name: "resources.theories.name",
        description: "resources.theories.description",
        image: "/assets/img/resources/companions.jpg",
        route: "./theories"
    },
    {
        name: "resources.commercials.name",
        description: "resources.commercials.description",
        image: "/assets/img/resources/comercials.jpg",
        route: "./commercials"
    },
    {
        name: "resources.ownCreations.name",
        description: "resources.ownCreations.description",
        image: "/assets/img/resources/companions.jpg",
        route: "./ownCreation"
    }]

  constructor(config: ConfigService, private translateService: TranslateConfigService) {
    config.updateDataSubject(RESOURCES);
  }
}
