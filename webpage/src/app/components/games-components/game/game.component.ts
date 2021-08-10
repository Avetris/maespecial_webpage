import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private gameService: GamesService) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.gameService.getGameInfo(params['game']).pipe(takeUntil(this.componentDestroyed$)).subscribe({
        next: gameInfo => {
          if(gameInfo == undefined)
          {
            this.router.navigate(['/games']);
          }
          this.game = gameInfo;
        }
      });
   });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
