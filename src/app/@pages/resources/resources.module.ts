import { NgModule } from '@angular/core';
import { ResourcesComponent } from './resources.component';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    SharedPagesModule,
    RouterModule
  ],
  exports: [ResourcesComponent]
})
export class ResourcesModule { }
