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
  private _order: number;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public login(name: string): void {
    const player: Player = {
      username: name,
      points: 0,
    }
    this._currentPlayer.next(player);
    this.socket.emit('login', player);
  }

  public getCurrentPlayer(): Observable<Player> {
    return this._currentPlayer;
  }

  public setAdmin(value: boolean): void  {
    this._isAdmin.next(value);
  }

  public isAdmin(): Observable<boolean> {
    return this._isAdmin;
  }

  public getOrder(): number {
    return this._order;
  }

  public setOrder(num: number): void {
    this._order = num;
  }

  getAllPlayers(): Observable<string[]> {
    this.socket.emit('get players');
    return new Observable<string[]>(players => {
      this.socket.on('set players', (data) => {
        players.next(data.players);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
}
