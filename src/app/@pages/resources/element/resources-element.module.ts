import { NgModule } from '@angular/core';
import { ResourcesElementComponent } from './resources-element.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view'; // ng-image-fullscreen-view


@NgModule({
  declarations: [ResourcesElementComponent],
  imports: [
    SharedPagesModule,
    NgImageFullscreenViewModule
  ],
  exports: [ResourcesElementComponent]
})
export class ResourcesElementModule {}
