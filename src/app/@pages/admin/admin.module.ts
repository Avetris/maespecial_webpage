import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { SharedPagesModule } from '../shared-pages.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedPagesModule,
    RouterModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
