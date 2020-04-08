import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'app/shared/player/player.service';
import { map, switchMap } from 'rxjs/operators';
import { Player } from 'app/class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private _rxCurrentPlayer: Subscription;
  private _rxPlayers: Subscription;
  public currentPlayer: Player;
  public players: Player[];
  public showUsers = false;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this._rxCurrentPlayer = this.playerService.getCurrentPlayer().subscribe(player => {
      if (player.playerId >= 0) {
        this.currentPlayer = player;
        this.showUsers = true;
        // show player list component
      } else {
        this.showUsers = false;
        // want user to login
        // show Login
      }
    });

    this._rxPlayers = this.playerService.getAllPlayers().subscribe(players => {
      console.log(players);
      this.players = players;
    })
  }

  ngOnDestroy() {
    this._rxCurrentPlayer.unsubscribe();
    this._rxPlayers.unsubscribe();
  }

}
