import { NgModule } from '@angular/core';
import { ResourcesComponent } from './resources.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { PosterImageModule } from 'src/app/@core/components/poster-image/poster-image.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    SharedPagesModule,
    PosterImageModule,
    PublishInfoModule
  ],
  exports: [ResourcesComponent]
})
export class ResourcesModule { }
