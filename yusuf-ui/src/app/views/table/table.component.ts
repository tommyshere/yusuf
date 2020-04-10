import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'app/shared/player/player.service';
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
  public players: string[];
  public showTable = false;
  public startGame = false;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this._rxCurrentPlayer = this.playerService.getCurrentPlayer().subscribe(player => {
      if (player) {
        this.currentPlayer = player;
        this.showTable = true;
        // show player list component
      } else {
        this.showTable = false;
        // want user to login
        // show Login
      }
    });

    this._rxPlayers = this.playerService.getAllPlayers().subscribe(players => {
      this.players = players;
    })
  }

  start() {
    this.startGame = true;
    // set the deck;
  }

  ngOnDestroy() {
    this._rxCurrentPlayer.unsubscribe();
    this._rxPlayers.unsubscribe();
  }

}
