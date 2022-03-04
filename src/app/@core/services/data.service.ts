import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageInfo } from 'src/app/models/PageInfo';
import { ResourceInfo, ResourceTypeInfo } from 'src/app/models/ResourceInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient){}

  public getPagesInfo(): Observable<PageInfo[]>
  {    
    return this.http.get<PageInfo[]>('/assets/pages_info.json');
  }  

  public getResourceList(): Observable<ResourceTypeInfo[]>
  {        
    return new Observable<ResourceTypeInfo[]>((observer) => {
      this.http.get('/assets/resources_data.json').subscribe( (resourcesInfo) => {
        let resourcesTypes: ResourceTypeInfo[] = [
          resourcesInfo["companions"], resourcesInfo["theories"], resourcesInfo["commercials"], resourcesInfo["ownCreations"]
        ]; 
  
        observer.next(resourcesTypes);
        observer.complete();
      });
    });
  }

  public getResourceData(type: EResourcesType): Observable<ResourceTypeInfo>
  {      
    return new Observable<ResourceTypeInfo>((observer) => {
      this.http.get('/assets/resources_data.json').subscribe( (resourcesInfo) => {
        observer.next(this.createDataObject(resourcesInfo[this.getResourceInfoKey(type)]));
        observer.complete();
      });
    });     
  }

  private getResourceInfoKey(type: EResourcesType): string
  {
    switch(type)
    {
      case EResourcesType.Companions: return "companions"
      case EResourcesType.Commercials: return "commercials"
      case EResourcesType.Therories: return "theories"
      case EResourcesType.OwnCreation: return "ownCreations"
    }
  }

  private createDataObject(resources: ResourceTypeInfo): ResourceTypeInfo
  {
    for(var i = 0; i < resources.data.length; i++)
    {
      if(resources.data[i].showDate)
      {
        resources.data[i].showDate = new Date(resources.data[i].showDate)
        if(resources.data[i].showDate > new Date())
        {
          resources.data.splice(i, 1);
          i--;
        }
      }
    }
    return resources;
  }
}


export enum EResourcesType { Commercials, Companions, OwnCreation, Therories };
