import { Component, OnInit } from '@angular/core';
import { RESOURCES_COMMERCIALS, RESOURCES_COMPANIONS, RESOURCES_OWNCREATIONS, RESOURCES_THEORIES } from 'src/app/@core/components/header/header.constants';
import { ResourceImageInfo, ResourceInfo } from 'src/app/models/ServerData';
import { ConfigService } from 'src/app/@core/services/config.service';
import { ResourceService, EResourcesType } from 'src/app/@core/services/data/resources.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companions',
  templateUrl: './resources-element.component.html',
  styleUrls: ['./resources-element.component.css']
})
export class ResourcesElementComponent implements OnInit {

  loading: boolean;

  resourceType: EResourcesType;
  resourceData: ResourceInfo[]

  currentIndex: any = -1;
  showFlag: any = false;
  
  resourceImage: Array<object> = []/*[{
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      title: 'Hummingbirds are amazing creatures'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
      video: 'https://youtu.be/tYa6OLQHrEc',
      posterImage: 'https://img.youtube.com/vi/tYa6OLQHrEc/hqdefault.jpg',
      title: 'Youtube example one with title.'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      title: 'Most beautiful birds in the world flying.'
  }];*/

  constructor(
    private router: Router,
    private resourceService: ResourceService,
    private config: ConfigService,
    private translateService: TranslateConfigService) {

    this.loading = true;
    let page = this.router.url.split("/").pop();
    if (page == "companions")
    {
      config.updateDataSubject(RESOURCES_COMPANIONS);
      this.resourceType = EResourcesType.Companions;
    }
    else if (page == "theories")
    {
      config.updateDataSubject(RESOURCES_THEORIES);
      this.resourceType = EResourcesType.Therories;
    }
    else if (page == "commercials")
    {
      config.updateDataSubject(RESOURCES_COMMERCIALS);
      this.resourceType = EResourcesType.Commercials;
    }
    else if (page == "ownCreation")
    {
      config.updateDataSubject(RESOURCES_OWNCREATIONS);
      this.resourceType = EResourcesType.OwnCreation;
    }
  }

  ngOnInit() {
    this.resourceService.getResources(this.resourceType).subscribe((resourcesInfo: ResourceInfo[]) => {
      this.resourceData = resourcesInfo      
      this.loading = false;
    });
  }
  
  showLightbox(resourceImage: ResourceImageInfo[]) {
    this.currentIndex = 0;    
    this.resourceImage = []
    for(let i = 0; i < resourceImage.length; i++)
    {
      this.resourceImage.push({ image: resourceImage[i].image_path });
    }


    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
