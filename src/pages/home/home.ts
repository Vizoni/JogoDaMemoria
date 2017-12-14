import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CardsPage } from './../cards/cards';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @Input() cardsQuantity: number[] = [4,6,8,10,12];

  constructor(public navCtrl: NavController) {

  }

  setCardQuantity(qnt: number): void {
    console.log('qnt:',qnt);
    
    // this.navCtrl.push(CardsPage);
    this.navCtrl.push(CardsPage, {
      quantityOfCards: qnt
    });
  }
}