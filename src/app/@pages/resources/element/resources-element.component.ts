import { Component, OnInit } from '@angular/core';
import { RESOURCES_COMMERCIALS, RESOURCES_COMPANIONS, RESOURCES_OWNCREATIONS, RESOURCES_THEORIES } from 'src/app/@core/components/header/header.constants';
import { ResourceTypeInfo } from 'src/app/models/ResourceInfo';
import { ConfigService } from 'src/app/@core/services/config.service';
import { DataService, EResourcesType } from 'src/app/@core/services/data.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-companions',
  templateUrl: './resources-element.component.html',
  styleUrls: ['./resources-element.component.css']
})
export class ResourcesElementComponent implements OnInit {

  resourceType: EResourcesType;
  resourceData: ResourceTypeInfo

  constructor(
    private router: Router,
    private dataService: DataService, 
    private config: ConfigService, 
    private translateService: TranslateConfigService) {
      let page = this.router.url.split("/").pop();
      if(page == "companions")
      {
        config.updateDataSubject(RESOURCES_COMPANIONS);
        this.resourceType = EResourcesType.Companions;
      }
      else if(page == "theories")
      {        
        config.updateDataSubject(RESOURCES_THEORIES);
        this.resourceType = EResourcesType.Therories;
      }
      else if(page == "commercials")
      {        
        config.updateDataSubject(RESOURCES_COMMERCIALS);
        this.resourceType = EResourcesType.Commercials;
      }
      else if(page == "ownCreation")
      {        
        config.updateDataSubject(RESOURCES_OWNCREATIONS);
        this.resourceType = EResourcesType.OwnCreation;
      }
  }
  
  ngOnInit() {
    this.dataService.getResourceData(this.resourceType).subscribe( (resourcesInfo: ResourceTypeInfo) => { 
      this.resourceData = resourcesInfo
    });
  }
}
