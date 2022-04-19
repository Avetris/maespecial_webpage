import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadModule } from '../@core/modules/lazy-loading.module';
import { LoadingModule } from '../@core/components/loading/loading.module';
import { LoginComponent } from './admin/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule,
    LoadingModule
  ],
  exports: [
    CommonModule,
    LazyLoadModule,
    LoadingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class SharedPagesModule { }
