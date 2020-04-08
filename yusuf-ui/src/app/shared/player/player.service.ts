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
  // private _players = new BehaviorSubject<Player[]>([]);

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  login(username: string) {
    this.socket.emit('login', username);
    this.setPlayerFromServer();
  }

  public setPlayerFromServer(): void {
    this.socket.on('get user', (player) => {
      this._currentPlayer.next(player)
    });
  }

  getAllPlayers(): Observable<Player[]> {
    this.socket.emit('get users');
    return new Observable<Player[]>(players => {
      this.socket.on('get users', (data) => {
        players.next(data);
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
