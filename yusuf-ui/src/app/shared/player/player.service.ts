import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from 'app/class';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private socket;
  private _currentPlayer = new BehaviorSubject<Player>(new Player());

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  login(username: string) {
    this.socket.emit('login', username);
    this.setPlayerFromServer();
  }

  public setPlayerFromServer(): void {
    this.socket.on('get current player', (data) => {
      console.log(data);
      this._currentPlayer.next(data.currentPlayer)
    });
  }

  getAllPlayers(): Observable<string[]> {
    this.socket.emit('get players');
    return new Observable<string[]>(players => {
      this.socket.on('get players', (data) => {
        players.next(data.players);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public getCurrentPlayer(): Observable<Player> {
    return this._currentPlayer;
  }

  public setCurrentPlayer(player: Player): void {
    this._currentPlayer.next(player);
  }
}
