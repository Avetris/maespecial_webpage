import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from 'src/app/models/PageInfo';
import { ResourceInfo, General } from 'src/app/models/ServerData';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends DataService {
  
  public getPagesInfo(): Observable<PageInfo[]>
  {    
    return this.http.get<PageInfo[]>('/assets/pages_info.json');
  }  

  public getResources(type: EResourcesType = null): Observable<ResourceInfo[]>
  {      
    if(type == null) return this.http.get<ResourceInfo[]>(`${this.adminPath}/resources`, {withCredentials: true});
    else return this.http.get<ResourceInfo[]>(`${this.anonyPath}/resources?type=${type.toString()}`);
  }

  public createResources(resource: ResourceInfo): Observable<ResourceInfo>
  {      
    return this.http.post<ResourceInfo>(`${this.adminPath}/resources`, resource, {withCredentials: true});
  }

  public updateResources(resource: ResourceInfo): Observable<General>
  {      
    return this.http.put<General>(`${this.adminPath}/resources/${resource.id}`, resource, {withCredentials: true});
  }

  public deleteResources(id: number): Observable<General>
  {      
    return this.http.delete<General>(`${this.adminPath}/resources/${id}`, {withCredentials: true});
  }
}

export enum EResourcesType { Commercials = "commercials", Companions = "companions", OwnCreation = "ownCreations", Therories = "theories" };
