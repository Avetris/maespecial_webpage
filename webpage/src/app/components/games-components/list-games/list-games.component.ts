import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit {
  
  componentDestroyed$: Subject<boolean> = new Subject()

  games: Game[] = []

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.gameService.getGameList().pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: gameList => {
        console.log(gameList)
        this.games = gameList;
      }
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
