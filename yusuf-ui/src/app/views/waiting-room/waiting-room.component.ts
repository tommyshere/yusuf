import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from 'app/shared/socketio/socketio.service';
import { Subscription } from 'rxjs';
import { User } from 'app/class';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  private _rx: Subscription;
  public users: User[] = [];

  constructor(
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this._rx = this.socketService.getUser().subscribe(data => {
      this.users.push(data);
      console.log(this.users);
    });
  }

  ngOnDestroy(): void {
    this._rx.unsubscribe();
  }

}
