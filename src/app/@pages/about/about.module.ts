import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { SharedPagesModule } from '../shared-pages.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedPagesModule,
    SidebarModule
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
