import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedPagesModule } from '../shared-pages.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedPagesModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
