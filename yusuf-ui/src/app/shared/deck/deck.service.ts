import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deck } from 'app/class';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private _values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  private _suits = ['spade', 'clubs', 'diamonds', 'hearts'];
  private _deck = new BehaviorSubject<Deck>(new Deck());
  private _discardPile = new BehaviorSubject<Deck>(new Deck());

  constructor(
    private socket
  ) { }

  public getDeck(): Observable<Deck> {
    this.socket.emit('get deck');
    return new Observable<Deck>(deck => {
      this.socket.on('get deck', (newDeck: Deck) => {
        deck.next(newDeck);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public createDeck(numDeck: number): void {
    const newDeck = new Deck();

    let cards = Array.apply(null, new Array(numDeck)).map(() => this._values);
    cards = [].concat.apply([], cards);

    newDeck.spade = this._shuffleCards(cards);
    newDeck.hearts = this._shuffleCards(cards);
    newDeck.clubs = this._shuffleCards(cards);
    newDeck.diamonds = this._shuffleCards(cards);

    this._emitDeck(newDeck);
  }

  public createHand(): Deck {
    let newDeck: Deck;
    const hand = new Deck();
    // get deck from server
    this.socket.emit('get deck');
    this.socket.on('get deck', (data) => {
      for (let i = 0; i < 5; i++) {
        // get random suit from deck
        const randomSuit = this._randomSuit();
        const pulledCard = data.deck[randomSuit].splice(0, 1);
        hand[randomSuit].push(pulledCard);
        newDeck = data.deck;
      }
    });
    this.socket.disconnect();

    this._emitDeck(newDeck);
    return hand;
  }

  private _emitDeck(deck: Deck): void {
    this.socket.emit('new deck', deck);
  }

  private _shuffleCards(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private _randomSuit(): string {
    return this._suits[this._suits.length * Math.random() << 0];
  }

}
