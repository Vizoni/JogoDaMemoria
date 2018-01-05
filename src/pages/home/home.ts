import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CardsPage } from './../cards/cards';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @Input() cardsQuantity: number[] = [12,20,30];

  constructor(public navCtrl: NavController) {}

  setCardQuantity(qnt: number): void {
    this.navCtrl.push(CardsPage, {
      quantityOfCards: qnt
    });
  }
}