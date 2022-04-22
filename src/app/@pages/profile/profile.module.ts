import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { SharedPagesModule } from '../shared-pages.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedPagesModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
