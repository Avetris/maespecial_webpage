import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { SharedPagesModule } from '../shared-pages.module';


@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    SharedPagesModule,
    SidebarModule
  ],
  exports: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
