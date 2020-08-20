import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game, VoteResponse } from '../../interfaces/interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles: [
    `
      .card-columns {
        column-count: 5;
      }
    `,
  ],
})
export class GotyComponent implements OnInit {
  games: Game[];

  constructor(private gs: GameService) {}

  ngOnInit(): void {
    this.gs.getNominated().subscribe((games) => (this.games = games));
  }

  vote(game: Game): void {
    this.gs.voteGame(game.id).subscribe((res: VoteResponse) => {
      if (res.ok) {
        Swal.fire('Gracias', res.message, 'success');
      } else {
        Swal.fire('Oops', res.message, 'error');
      }
    });
  }
}
