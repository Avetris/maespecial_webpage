import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';

import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { SharedPagesModule } from '../shared-pages.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    SharedPagesModule,
    SidebarModule,
    FormsModule
  ],
  exports: [ContactComponent]
})
export class ContactModule { }
