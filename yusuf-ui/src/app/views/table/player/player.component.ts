import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/class';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() public player: Player;
  // need logic for the player's turn to light up
  // need logic for whenever a user calls yusuf
  // show the player's points

  constructor() { }

  ngOnInit(): void {
  }

}
