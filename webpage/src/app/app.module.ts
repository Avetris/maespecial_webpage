import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListGamesComponent } from './components/games-components/list-games/list-games.component';
import { AboutComponent } from './components/about/about.component'; 
import { MatListModule } from '@angular/material/list';
import { GameComponent } from './components/games-components/game/game.component';
import { GamesService } from './services/games.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ParallaxComponent } from './components/animations/parallax/parallax.component';
import { FadeComponent } from './components/animations/fade/fade.component';
import { SlideComponent } from './components/animations/slide/slide.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ListGamesComponent,
    AboutComponent,
    GameComponent,
    HomeComponent,
    HeaderComponent,
    ParallaxComponent,
    FadeComponent,
    SlideComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatListModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }