import { FooterComponent } from './footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateCustomModule } from '../../modules/translate-custom.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateCustomModule
  ],
  exports: [FooterComponent]

})
export class FooterModule { }
