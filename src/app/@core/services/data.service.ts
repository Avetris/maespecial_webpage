import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileUpload } from 'src/app/models/FileUpload';
import { PageInfo } from 'src/app/models/PageInfo';
import { ResourceInfo, ResourceTypeInfo } from 'src/app/models/ResourceInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public adminPath = ""
  anonyPath = ""

  constructor(private http: HttpClient){
    const host = isDevMode() ? "http://localhost:4500" : `https://${window.location.hostname}`;
    this.adminPath = `${host}/api/admin`;
    this.anonyPath = `${host}/api/anony`
  }

  public getPagesInfo(): Observable<PageInfo[]>
  {    
    return this.http.get<PageInfo[]>('/assets/pages_info.json');
  }  

  public getResourceData(type: EResourcesType): Observable<ResourceTypeInfo>
  {      
    return this.http.get<ResourceTypeInfo>(`${this.anonyPath}/resources?type=${type.toString()}`);
  }

  public uploadPostImage(data: FormData): Promise<FileUpload>
  {      
    return this.http.post<FileUpload>(`${this.adminPath}/upload`, data, {withCredentials: true}).toPromise()   
  }
}


export enum EResourcesType { Commercials = "commercials", Companions = "companions", OwnCreation = "ownCreations", Therories = "theories" };
