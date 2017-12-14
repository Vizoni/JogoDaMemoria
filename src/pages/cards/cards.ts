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
  
  numeroGrid: number;

  pickedFirstCard: boolean = false;
  firstCard: Card;
  secondCard: Card;
  resultMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) 
  {
  
  }

  pickCard(card: Card): void {
    if (!this.pickedFirstCard) { // flag pra ver se já escolheu os cards
      this.firstCard = card;
      this.pickedFirstCard = true;
      this.displayCardValue(this.firstCard);
    } else {
      this.secondCard = card;
      this.displayCardValue(this.secondCard);
      let result = this.checkIfMatches(this.firstCard,this.secondCard);
      if (!result) {
        this.resultMessage = "Tente novamente!";
      } else {
        this.hideCardsMatched();
        this.resultMessage = "Achou um par!";
      }
      this.resetPickedCards();
      
    }
    
  }

  private generateCards(quantity): void {      
    for (var i = 1; i <= quantity; i++) {
      let newCard = new Card(this.randomizeValue());
      this.baseCards.push(newCard);
    }        
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

  private hideCardsMatched(): void {
    this.firstCard.setDisplay(false);
    this.secondCard.setDisplay(false);
  }

  private resetPickedCards(): void {
    this.firstCard = null;
    this.secondCard = null;
    this.pickedFirstCard = false;
  }
  
  ionViewDidLoad() {
    this.generateCards(this.navParams.get('quantity')/2);
    this.cards = this.setPairForEachCard(this.baseCards);
    // debugger;
  }


    
}
