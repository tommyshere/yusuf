import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from 'app/class';

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

  getUser(): Observable<User> {
    const observable = new Observable<User>(observer => {
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
