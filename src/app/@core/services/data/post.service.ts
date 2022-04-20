import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/FileUpload';
import { PageInfo } from 'src/app/models/PageInfo';
import { PostInfo } from 'src/app/models/ServerData';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {

  public getPosts(): Observable<PostInfo[]>
  {      
    return this.http.get<PostInfo[]>(`${this.anonyPath}/posts`);
  }

  public getPostData(postId: number): Observable<PostInfo>
  {      
    return this.http.get<PostInfo>(`${this.anonyPath}/resources/post/${postId}`);
  }

  public uploadPostImage(data: FormData): Promise<FileUpload>
  {      
    return this.http.post<FileUpload>(`${this.adminPath}/upload`, data, {withCredentials: true}).toPromise()   
  }
}
