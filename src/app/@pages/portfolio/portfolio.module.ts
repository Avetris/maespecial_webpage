import { NgModule } from '@angular/core';

import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { PortfolioComponent } from './portfolio.component';
import { SharedPagesModule } from '../shared-pages.module';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    SharedPagesModule,
    SidebarModule
  ],
  exports: [PortfolioComponent]
})
export class PortfolioModule { }
