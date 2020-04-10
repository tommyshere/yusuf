import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'app/shared/player/player.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() public showTable = new EventEmitter();

  public username = new FormControl('');

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.playerService.login(this.username.value);
    this.showTable.emit();
  }

}
