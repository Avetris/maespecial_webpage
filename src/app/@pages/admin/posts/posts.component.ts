import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DIARY } from 'src/app/@core/components/header/header.constants';
import { ConfigService } from 'src/app/@core/services/config.service';
import { PostService } from 'src/app/@core/services/data/post.service';
import { DialogService, ESuccessType } from 'src/app/@core/services/dialog.service';
import { TranslateConfigService } from 'src/app/@core/services/translate-config.service';
import { General, PostInfo, PostInfoList } from 'src/app/models/ServerData';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  loading: boolean;

  post: PostInfo
  diary: PostInfo[];
  page: number = 0
  pageSize: number = 10
  length: number = 1

  constructor(private dialogService: DialogService,
    private translateService: TranslateConfigService,
    private postService: PostService) {
    this.loading = true;

    this.getData(this.pageSize, this.page);
  }

  changePage(event) {
    this.getData(event.pageSize, event.pageIndex);
  }

  getData(pageSize, pageIndex) {
    this.postService.getPosts(pageSize, pageIndex).subscribe((response: PostInfoList) => {
      console.log(response)
      this.diary = response.data;
      this.page = response.meta.page;
      this.pageSize = response.meta.pageSize;
      this.length = response.meta.length;
      this.loading = false;
    });
  }

  remove(id) {
    this.dialogService.showConfirmDialog()
      .subscribe((confirm) => {
        if (confirm)
        {
          this.postService.deletePost(id).subscribe((general: General) => {
            if (general.status == 200)
            {              
              this.dialogService.showSuccessMessage(ESuccessType.REMOVE)
              this.getData(this.pageSize, this.page);
            }
            else
            {
              this.dialogService.showErrorMessage(`Status ${general.status}`);
            }
          }, error => {
            this.dialogService.showErrorMessage(error);
          });
        }
      });
  }

  showNew(publishDate: Date) {
    return ((new Date().getTime() - new Date(publishDate).getTime()) / (1000 * 3600 * 24)) <= 7
  }
}
