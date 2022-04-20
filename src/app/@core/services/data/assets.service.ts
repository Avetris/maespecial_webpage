import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/FileUpload';
import { PageInfo } from 'src/app/models/PageInfo';
import { ResourceInfo, PostInfo } from 'src/app/models/ServerData';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService extends DataService {
  
  public getPagesInfo(): Observable<PageInfo[]>
  {    
    return this.http.get<PageInfo[]>('/assets/pages_info.json');
  }  
}
