import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { General, PostInfo, PostInfoList } from 'src/app/models/ServerData';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
  
  public getAllPosts(pageSize: number, page = 1): Observable<PostInfoList> {
    return this.http.get<PostInfoList>(`${this.adminPath}/posts?pageSize=${pageSize}&page=${page}`);
  }

  public getPosts(pageSize: number, page = 1): Observable<PostInfoList> {
    return this.http.get<PostInfoList>(`${this.anonyPath}/posts?pageSize=${pageSize}&page=${page}`);
  }

  public getPostData(postId: number): Observable<PostInfo> {
    return this.http.get<PostInfo>(`${this.anonyPath}/post/${postId}`);
  }

 /* public uploadPostImage(data: FormData): Promise<FileUpload> {
    return this.http.post<FileUpload>(`${this.adminPath}/upload`, data, { withCredentials: true }).toPromise()
  }*/

  public createPost(post: PostInfo): Observable<General> {
    return this.http.post<General>(`${this.adminPath}/post`, post, { withCredentials: true });
  }

  public updatePost(post: PostInfo): Observable<General> {
    return this.http.put<General>(`${this.adminPath}/post`, post, { withCredentials: true });
  }

  public deletePost(id: number): Observable<General> {
    return this.http.delete<General>(`${this.adminPath}/post/${id}`, { withCredentials: true });
  }
}
