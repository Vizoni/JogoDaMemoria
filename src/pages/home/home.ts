import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CardsPage } from './../cards/cards';
import { CameraService } from '../../providers/camera/camera';
import { Entry } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @Input() cardsQuantity: number[] = [12,20,30];

  photo: Entry;

  constructor(
    public navCtrl: NavController,
    public cameraService: CameraService,
  ) {}

  setCardQuantity(qnt: number): void {
    this.navCtrl.push(CardsPage, {
      quantityOfCards: qnt
    });
  }

  getPhotos(sourceType: number): void {
    this.cameraService.getPhoto(0)
      .then((photo: Entry) => {
        this.photo = photo;
      })
  }

}