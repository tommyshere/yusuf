import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Player } from 'app/class';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  login(username: string) {
    this.socket.emit('add user', username);
  }

  getUser(): Observable<Player> {
    const observable = new Observable<Player>(observer => {
      this.socket.on('user joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
