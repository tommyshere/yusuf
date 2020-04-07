import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketioService } from 'app/shared/socketio/socketio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      tableName: '',
      maxNum: 150,
      username: '',
      flush: false,
      straight: false
    });
  }

  public createTable() {
    this.socketService.login(this.formGroup.controls.username.value);
    this.router.navigate(['/waiting-room']);
  }

}
