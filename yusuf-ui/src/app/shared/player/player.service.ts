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
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _currentPlayer = new BehaviorSubject<Player>(new Player());

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public login(username: string): void {
    this.socket.emit('login', username);
    this.setPlayerFromServer();
  }

  public setAdmin(value: boolean): void  {
    this._isAdmin.next(value);
  }

  public isAdmin(): Observable<boolean> {
    return this._isAdmin;
  }

  public setPlayerFromServer(): void {
    this.socket.on('set current player', (data) => {
      this._currentPlayer.next(data.currentPlayer)
    });
  }

  getAllPlayers(): Observable<string[]> {
    this.socket.emit('get players');
    return new Observable<string[]>(players => {
      this.socket.on('set players', (data) => {
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
