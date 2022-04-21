import { NgModule } from '@angular/core';
import { ResourcesElementComponent } from './resources-element.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';

@NgModule({
  declarations: [ResourcesElementComponent],
  imports: [
    SharedPagesModule
  ],
  exports: [ResourcesElementComponent]
})
export class ResourcesElementModule { }
