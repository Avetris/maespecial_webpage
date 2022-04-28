import { FooterModule } from './@core/components/footer/footer.module';
import { HeaderModule } from './@core/components/header/header.module';
import { NavbarModule } from './@core/components/navbar/navbar.module';
import { NavbarAdminModule } from './@core/components/navbar-admin/navbar-admin.module';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { YoutubePipe } from './@core/pipes/youtube.pipe';
import { DomSecurePipe } from './@core/pipes/dom-secure.pipe';
import { SidebarModule } from './@core/components/sidebar/sidebar.module';
import { LOCALE_ID, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { TranslateCustomModule } from './@core/modules/translate-custom.module';
import { AuthGuardService } from './@core/services/auth/auth-guard.service';
import { AuthService } from './@core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { ConfirmDialogComponent } from './@core/components/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './@core/components/message-dialog/message-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es')

const COMPONENTS = [
  AppComponent
];

const PIPES = [
  YoutubePipe,
  DomSecurePipe
];

@NgModule({
  declarations: [
    COMPONENTS,
    PIPES,
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    NavbarAdminModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    NgxMatMomentModule,
    MatTooltipModule,
    TranslateCustomModule.forRoot(['es', 'en', 'eu'], 'es')
  ],
  exports: [TranslateCustomModule, ReactiveFormsModule],
  providers: [AuthGuardService, AuthService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
