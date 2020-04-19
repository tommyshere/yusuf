import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public adminStartGame() {
    this.socket.emit('admin start game');
  }

  public startGame(): Observable<boolean> {
    return new Observable<boolean>(value => {
      this.socket.on('admin start game', () => {
        value.next(true);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
}
