import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadModule } from '../@core/modules/lazy-loading.module';
import { LoadingModule } from '../@core/components/loading/loading.module';
import { LoginComponent } from './admin/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    LazyLoadModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class SharedPagesModule { }
