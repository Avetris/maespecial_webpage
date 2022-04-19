import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedPagesModule } from '../shared-pages.module';
import { PosterImageModule } from 'src/app/@core/components/poster-image/poster-image.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    SharedPagesModule,
    PosterImageModule,
    PublishInfoModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
