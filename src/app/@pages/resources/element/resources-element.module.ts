import { NgModule } from '@angular/core';
import { ResourcesElementComponent } from './resources-element.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';

@NgModule({
  declarations: [ResourcesElementComponent],
  imports: [
    SharedPagesModule,
    PublishInfoModule
  ],
  exports: [ResourcesElementComponent]
})
export class ResourcesElementModule { }
