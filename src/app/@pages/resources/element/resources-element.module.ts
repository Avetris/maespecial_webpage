import { NgModule } from '@angular/core';
import { ResourcesElementComponent } from './resources-element.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { PosterImageModule } from 'src/app/@core/components/poster-image/poster-image.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';

@NgModule({
  declarations: [ResourcesElementComponent],
  imports: [
    SharedPagesModule,
    PosterImageModule,
    PublishInfoModule
  ],
  exports: [ResourcesElementComponent]
})
export class ResourcesElementModule { }
