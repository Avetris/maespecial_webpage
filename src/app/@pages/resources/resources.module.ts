import { NgModule } from '@angular/core';
import { ResourcesComponent } from './resources.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { PublishInfoModule } from 'src/app/@core/components/publish-info/publish-info.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    SharedPagesModule,
    PublishInfoModule,
    RouterModule
  ],
  exports: [ResourcesComponent]
})
export class ResourcesModule { }
