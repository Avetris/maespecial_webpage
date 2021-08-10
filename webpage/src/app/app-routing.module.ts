import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ParallaxComponent } from './components/animations/parallax/parallax.component';
import { GameComponent } from './components/games-components/game/game.component';
import { ListGamesComponent } from './components/games-components/list-games/list-games.component';
import { HomeComponent } from './components/home/home.component';
import { FadeComponent } from './components/animations/fade/fade.component';
import { SlideComponent } from './components/animations/slide/slide.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { home: true } },
  { path: 'parallax', component: ParallaxComponent, data: { home: true } },
  { path: 'slide', component: SlideComponent, data: { home: true } },
  { path: 'fade', component: FadeComponent, data: { home: true } },
  { path: 'games', component: ListGamesComponent, data: { home: false } },
  { path: 'games/:game', component: GameComponent, data: { home: false } },
  { path: 'about', component: AboutComponent, data: { home: false } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
