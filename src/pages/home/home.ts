import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CardsPage } from './../cards/cards';
import { CameraService } from '../../providers/camera/camera';
import { Entry } from '@ionic-native/file';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @Input() cardsQuantity: number[] = [12,20,30];

  photos: any[];

  constructor(
    public navCtrl: NavController,
    public cameraService: CameraService,
    private imagePicker: ImagePicker
  ) {}

  setCardQuantity(qnt: number): void {
    this.navCtrl.push(CardsPage, {
      quantityOfCards: qnt
    });
  }

  getPhotos(): void {
    let options: ImagePickerOptions = {
      quality: 100
    };

    this.imagePicker.getPictures(options)
    .then((results) => {
      this.navCtrl.push(CardsPage, {
        quantityOfCards: results.length,
        photos: results
      })
    })
    .catch((error: Error) => console.log("imagePicker error:",error.message || error));
  }


}