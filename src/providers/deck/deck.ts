import { Injectable } from '@angular/core';

import { Card } from '../../models/Card';

@Injectable()
export class DeckService {

  constructor(

  ) {}

  generateCardsValueWithPhotos(quantity: number, photos: string[]): any {
    return photos.concat(photos);
  }

  generateCardsValue(quantity): number[] {
    let arrayOfValues: number[] = [];
    for (var i = 1; i <= quantity/2; i++) {
      arrayOfValues.push(this.randomizeValue());
    }   
    return arrayOfValues.concat(arrayOfValues);    
  }

  generateCardsId(arrayWithValuesGenerated: any[]): Card[] {
    var arrayDeCartas: Card[] = [];
    arrayWithValuesGenerated.forEach(singleValue => {
      arrayDeCartas.push(new Card(singleValue));
    })
      for (var i = 0; i < arrayDeCartas.length; i++) {
      arrayDeCartas[i].setId(this.randomizeValue());
    }    
    return arrayDeCartas;    
  }

  setPairForEachCard(cardsWithoutPair: Card[]): Card[] {
    // set pair and shuffle the array with the pairs created: this.baseCards.concat(this.baseCards)
    return this.shuffleCards(cardsWithoutPair.concat(cardsWithoutPair));   
  }

  randomizeValue(): number {
    return Math.floor((Math.random() * 1000) + 1);
  }

  checkIfMatches(firstCard: Card, secondCard: Card): boolean {
    return (firstCard.getValue() === secondCard.getValue());
  }

  displayCardValue(card: Card): void {
    card.setDisplay(true);
  }

  shuffleCards(cardsArray): Card[] {
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

  checkGameEnded(cards: Card[]): boolean {
    var cardsMatched = cards.filter(function (element) {
      return element.getDisplay() == true;
    })
    return (cardsMatched.length == cards.length)
  }

}
