import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostComponent } from './create-post.component';
import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { PosterImageModule } from 'src/app/@core/components/poster-image/poster-image.module';
import { SharedPagesModule } from '../../shared-pages.module';
import { ButtonModule } from 'src/app/@core/components/button/button.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';
import { AccessDirectModule } from 'src/app/@core/components/access-direct/access-direct.module';

import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    SharedPagesModule,
    SidebarModule,
    PosterImageModule,
    ButtonModule,
    PublishInfoModule,
    AccessDirectModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  exports: [CreatePostComponent]
})
export class CreatePostModule { }
