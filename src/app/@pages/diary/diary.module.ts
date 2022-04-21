import { NgModule } from '@angular/core';

import { DiaryComponent } from './diary.component';
import { SharedPagesModule } from '../shared-pages.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [DiaryComponent],
  imports: [
    SharedPagesModule,
    RouterModule,
    MatPaginatorModule
  ],
  exports: [DiaryComponent]
})
export class DiaryModule { }
