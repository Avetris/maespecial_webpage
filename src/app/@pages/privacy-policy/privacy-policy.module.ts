import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { PrivacyPolicyRoutingModule } from './privacy_policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { SharedPagesModule } from '../shared-pages.module';


@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    SharedPagesModule,
    SidebarModule,
    PrivacyPolicyRoutingModule
  ],
  exports: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
