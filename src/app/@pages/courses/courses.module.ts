import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedPagesModule } from '../shared-pages.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    SharedPagesModule,
    PublishInfoModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
