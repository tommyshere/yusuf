import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private socket
  ) { }

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
