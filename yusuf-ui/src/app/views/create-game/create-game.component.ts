import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'app/shared/player/player.service';
import { DeckService } from 'app/shared/deck/deck.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private deckService: DeckService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      maxNum: 150,
      username: '',
      flush: false,
      straight: false
    });
  }

  public createTable() {
    this.playerService.login(this.formGroup.value.username);
    this.playerService.setAdmin(true);
    this.deckService.createDeck(1);
    this.router.navigate(['/yusuf']);
  }

}
