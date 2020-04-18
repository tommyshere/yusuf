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
      if (player.id >= 0) {
        this.currentPlayer = player;
        this.showTable = true;
        console.log(player);
        console.log('has player id');
      } else {
        console.log('login player');
        this.showTable = false;
        // want user to login
        // show Login
      }
      console.log(this.showTable);
    });

    this._rxPlayers = this.playerService.getAllPlayers().subscribe(players => {
      console.log(players);
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
