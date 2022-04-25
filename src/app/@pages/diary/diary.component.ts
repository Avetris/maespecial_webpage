import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DIARY } from 'src/app/@core/components/header/header.constants';
import { ConfigService } from 'src/app/@core/services/config.service';
import { PostService } from 'src/app/@core/services/data/post.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { PostInfo, PostInfoList } from 'src/app/models/ServerData';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {

  loading: boolean;

  post: PostInfo
  diary: PostInfo[] = [];
  page: number = 0
  pageSize: number = 10
  length: number = 1

  constructor(config: ConfigService,
    private translateService: TranslateConfigService,
    private postService: PostService,
    private router: Router) {
    config.updateDataSubject(DIARY);

    let post = this.router.url.split("/").pop();

    if (Number(post))
    {
      let postId = Number(post)
      this.loading = true;
      this.postService.getPostData(postId).subscribe((post: PostInfo) => {
        this.post = post;
        this.loading = false;
      })
    }
    else
    {
      this.getData(this.pageSize, this.page);
    }
  }

  changePage(event) {
    this.getData(event.pageSize, event.pageIndex);
  }

  getData(size, index) {
    this.loading = true;
    this.postService.getPosts(size, index).subscribe((response: PostInfoList) => {
      this.diary = response.data;
      this.page = response.meta.page;
      this.pageSize = response.meta.pageSize;
      this.length = response.meta.length;
      this.loading = false;
    });
  }

  showNew(publishDate: Date) {
    return ((new Date().getTime() - new Date(publishDate).getTime()) / (1000 * 3600 * 24)) <= 7
  }
}
