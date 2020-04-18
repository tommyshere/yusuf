import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'app/shared/player/player.service';
import { Player } from 'app/class';
import { Subscription } from 'rxjs';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private _rxCurrentPlayer: Subscription;
  private _rxPlayers: Subscription;
  private _rxAdmin: Subscription;
  private _rxStartGame: Subscription;

  public currentPlayer: Player;
  public players: string[];
  public showTable = false;
  public startGame = false;
  public isAdmin = false;

  constructor(
    private playerService: PlayerService,
    private tableService: TableService
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
      this.players = players;
    })

    this._rxAdmin = this.playerService.isAdmin().subscribe(value => {
      this.isAdmin = value;
    })

    this._rxStartGame = this.tableService.startGame().subscribe(value => {
      this.startGame = value;
    })
  }

  start() {
    this.tableService.adminStartGame();
  }

  ngOnDestroy() {
    this._rxCurrentPlayer.unsubscribe();
    this._rxPlayers.unsubscribe();
    this._rxAdmin.unsubscribe();
    this._rxStartGame.unsubscribe();
  }

}
