import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Card } from '../../models/Card';
import { DeckService } from './../../providers/deck/deck';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  baseCards: Card[] = []; // sem os pares
  
  cards: Card[] = this.deckService.setPairForEachCard(this.baseCards);  // com os pares
  
  pickedFirstCard: boolean = false;
  firstCard: Card;
  secondCard: Card;
  errorCounter: number = 0;
  flagDeckWithPhotos: boolean = false;

  constructor(
    public deckService: DeckService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) 
  {
  
  }

  ionViewDidLoad() {
    if (this.navParams.get('photos')) { // se tiver escolhido as fotos
      this.flagDeckWithPhotos = true;
      this.buildDeckWithPhotos(this.navParams.get('photos'))
    } else {
      this.buildDeckWithoutPhotos();
    }
  }

  pickCard(card: Card): void {
    if (!this.secondCard) {
      
      if (!this.pickedFirstCard && !card.getDisplay()) { // flag pra ver se já escolheu os cards
        this.firstCard = card;
        this.pickedFirstCard = true;
        this.deckService.displayCardValue(this.firstCard);
      } else if (!card.getDisplay()) {
        this.secondCard = card;
        this.deckService.displayCardValue(this.secondCard);
        let result = this.deckService.checkIfMatches(this.firstCard,this.secondCard);

        if (!result) {  // não são pares
          this.hideCards();
          this.resetPickedCards();  // depois que esconde, próxima escolha de cartas
          this.errorCounter = this.errorCounter + 1;
        } else {  // são pares
          this.resetPickedCards(); // acertou, não esconde as cartas acertadas mas reseta
          if (this.deckService.checkGameEnded(this.cards)) {
            
          }
        }
      }
      
    }

  }

  buildDeckWithoutPhotos(): void {
    this.errorCounter = 0; // reinicia o contador de errors
    let quantityOfCards = this.navParams.get('quantityOfCards');  // get quantity of cards user wanna play
    let arrayWithValues = this.deckService.generateCardsValue(quantityOfCards); //  generate cards value
    this.cards = this.deckService.shuffleCards(this.deckService.generateCardsId(arrayWithValues)); // generate cards and shuffle
  }

  buildDeckWithPhotos(photos: string[]): void {
    this.errorCounter = 0; // reinicia o contador de errors
    let quantityOfCards = this.navParams.get('quantityOfCards');
    let arrayWithValues = this.deckService.generateCardsValueWithPhotos(quantityOfCards, photos);
    this.cards = this.deckService.shuffleCards(this.deckService.generateCardsId(arrayWithValues));
  }

  restartGame(): void {
    if (this.navParams.get('photos')) { // se tiver escolhido as fotos
      this.flagDeckWithPhotos = true;
      this.buildDeckWithPhotos(this.navParams.get('photos'))
    } else {
      this.buildDeckWithoutPhotos();
    }
  }

  hideCards(): void {
    setTimeout(() => {
      this.firstCard.setDisplay(false);
      this.secondCard.setDisplay(false);
    }, 1000);
  }

  resetPickedCards(): void {
    setTimeout(() => {
      this.firstCard = null;
      this.secondCard = null;
      this.pickedFirstCard = false;
    }, 1100);
  }
    
}
