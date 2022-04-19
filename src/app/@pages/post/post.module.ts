import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { SharedPagesModule } from '../shared-pages.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    SharedPagesModule
  ],
  exports: [PostComponent]
})
export class PostModule { }
