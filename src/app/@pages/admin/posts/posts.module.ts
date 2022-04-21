import { NgModule } from '@angular/core';

import { PostsComponent } from './posts.component';
import { SharedPagesModule } from '../../shared-pages.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [PostsComponent],
  imports: [
    SharedPagesModule,
    RouterModule,
    MatPaginatorModule
  ],
  exports: [PostsComponent]
})
export class PostsModule { }
