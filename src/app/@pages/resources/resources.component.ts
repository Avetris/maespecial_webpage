import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RESOURCES } from 'src/app/@core/components/header/header.constants';
import { ResourceTypeInfo } from 'src/app/models/ResourceInfo';
import { ConfigService } from 'src/app/@core/services/config.service';
import { DataService } from 'src/app/@core/services/data.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';

@Component({
  selector: 'blog-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resourcesTypes: ResourceTypeInfo[] = []

  constructor(private dataService: DataService, config: ConfigService, private translateService: TranslateConfigService) {
    config.updateDataSubject(RESOURCES);
  }
  
  ngOnInit() {
    this.dataService.getResourceList().subscribe((resources: ResourceTypeInfo[]) => this.resourcesTypes = resources);
  }
}
