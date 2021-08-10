import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private gamesUrl = '/assets/games.json';
    constructor(private http: HttpClient) { }

    getGameList(): Observable<Game[]> {
        return this.http.get<Game[]>(this.gamesUrl).pipe(catchError(this.handleError));
    }

    getGameInfo(gameName: string): Observable<Game> {
        return this.http.get<Game[]>(this.gamesUrl).pipe(map((users: Array<Game>) => users.filter(game => game.name == gameName)[0]))
    }

    private handleError(err: HttpErrorResponse) {
        return throwError(`An error occurred: ${err}`);
    }
}