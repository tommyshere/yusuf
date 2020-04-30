import { Component, AfterViewInit } from '@angular/core';
import { DeckService } from 'app/shared/deck/deck.service';
import { Deck } from 'app/class';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements AfterViewInit {
  public hand = new Deck();

  constructor(
    private deckService: DeckService
  ) { }

  ngAfterViewInit(): void {
    this.deckService.createHand().subscribe(hand => {
      this.hand = hand;
      console.log(hand);
    })
  }
}
