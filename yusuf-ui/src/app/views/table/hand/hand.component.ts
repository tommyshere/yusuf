import { Component, OnInit } from '@angular/core';
import { DeckService } from 'app/shared/deck/deck.service';
import { Deck } from 'app/class';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {
  public hand: Deck;

  constructor(
    private deckService: DeckService
  ) { }

  ngOnInit(): void {
    this.deckService.createHand().subscribe(hand => {
      this.hand = hand;
      console.log(hand);
    })
  }
}
