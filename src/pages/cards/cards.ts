import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Card } from '../../models/Card';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  baseCards: Card[] = []; // sem os pares
  
  cards: Card[] = this.setPairForEachCard(this.baseCards);  // com os pares
  
  pickedFirstCard: boolean = false;
  firstCard: Card;
  secondCard: Card;
  errorCounter: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) 
  {
  
  }

  ionViewDidLoad() {
    this.buildDeck();
  }

  pickCard(card: Card): void {
    if (!this.secondCard) {
      
      if (!this.pickedFirstCard && !card.getDisplay()) { // flag pra ver se já escolheu os cards
        this.firstCard = card;
        this.pickedFirstCard = true;
        this.displayCardValue(this.firstCard);
      } else if (!card.getDisplay()) {
        this.secondCard = card;
        this.displayCardValue(this.secondCard);
        let result = this.checkIfMatches(this.firstCard,this.secondCard);

        if (!result) {  // não são pares
          this.hideCards();
          this.resetPickedCards();  // depois que esconde, próxima escolha de cartas
          this.errorCounter = this.errorCounter + 1;
        } else {  // são pares
          this.resetPickedCards(); // acertou, não esconde as cartas acertadas mas reseta
        }
      }
      
    }

  }

  buildDeck(): void {
    this.errorCounter = 0; // reinicia o contador de errors
    let quantityOfCards = this.navParams.get('quantityOfCards');  // get quantity of cards user wanna play
    let arrayWithValues = this.generateCardsValue(quantityOfCards); //  generate cards value
    this.cards = this.shuffleCards(this.generateCardsId(arrayWithValues)); // generate cards and shuffle
  }

  private generateCardsValue(quantity): number[] {
    let arrayOfValues: number[] = [];
    for (var i = 1; i <= quantity/2; i++) {
      arrayOfValues.push(this.randomizeValue());
    }   
    return arrayOfValues.concat(arrayOfValues);    
  }

  private generateCardsId(arrayWithValuesGenerated: number[]): Card[] {
    var arrayDeCartas: Card[] = [];
    arrayWithValuesGenerated.forEach(singleValue => {
      arrayDeCartas.push(new Card(singleValue));
    })
      for (var i = 0; i < arrayDeCartas.length; i++) {
      arrayDeCartas[i].setId(this.randomizeValue());
    }    
    return arrayDeCartas;    
  }

  private setPairForEachCard(cardsWithoutPair: Card[]): Card[] {
    // set pair and shuffle the array with the pairs created: this.baseCards.concat(this.baseCards)
    return this.shuffleCards(this.baseCards.concat(this.baseCards));   
  }

  private randomizeValue(): number {
    return Math.floor((Math.random() * 1000) + 1);
  }

  private checkIfMatches(firstCard: Card, secondCard: Card): boolean {
    return (firstCard.getValue() === secondCard.getValue());
  }

  private displayCardValue(card: Card): void {
    card.setDisplay(true);
  }

  private shuffleCards(cardsArray): Card[] {
    var currentIndex = cardsArray.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = cardsArray[currentIndex];
        cardsArray[currentIndex] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporaryValue;
      }
      return cardsArray;
  }

  private hideCards(): void {
    setTimeout(() => {
      this.firstCard.setDisplay(false);
      this.secondCard.setDisplay(false);
    }, 1000);
  }

  private resetPickedCards(): void {
    setTimeout(() => {
      this.firstCard = null;
      this.secondCard = null;
      this.pickedFirstCard = false;
    }, 1100);
  }
    
}
