import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Game, VoteResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  games: Game[];

  constructor(private http: HttpClient) {}

  getNominated(): Observable<Game[]> {
    if (!this.games) {
      console.log('first time');
      return this.http.get<Game[]>(`${environment.url}/api/goty`).pipe(
        map((res) => {
          this.games = res;
          return res;
        })
      );
    } else {
      console.log('second time');
      return of(this.games);
    }
  }

  voteGame(id: string): Observable<VoteResponse> {
    return this.http
      .post<VoteResponse>(`${environment.url}/api/goty/${id}`, null)
      .pipe(
        catchError((err) => {
          err = err.error;
          const newErr: VoteResponse = {
            ok: err.ok,
            message: `${err.err.message} con id ${err.err.id}`,
          };
          return of(newErr);
        })
      );
  }
}
