import { NgModule } from '@angular/core';

import { CreatePostComponent } from './create-post.component';
import { SidebarModule } from 'src/app/@core/components/sidebar/sidebar.module';
import { SharedPagesModule } from 'src/app/@pages/shared-pages.module';
import { MatInputModule } from '@angular/material/input';

import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    SharedPagesModule,
    SidebarModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    QuillModule.forRoot()
  ],
  exports: [CreatePostComponent]
})
export class CreatePostModule { }
