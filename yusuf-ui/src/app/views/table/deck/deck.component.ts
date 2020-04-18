import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeckService } from 'app/shared/deck/deck.service';
import { Subscription } from 'rxjs';
import { Deck } from 'app/class';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {
  private _rxDeck: Subscription;

  public deck: Deck;

  constructor(
    private deckService: DeckService
  ) { }

  ngOnInit(): void {
    this._rxDeck = this.deckService.getDeck().subscribe(deck => {
      this.deck = deck;
      console.log(this.deck);
    })
  }

  ngOnDestroy(): void {
    this._rxDeck.unsubscribe();
  }

}
