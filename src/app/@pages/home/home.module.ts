import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedPagesModule } from '../shared-pages.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedPagesModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
