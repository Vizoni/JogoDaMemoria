import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { CardsPage } from './../cards/cards';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { CameraService } from '../../providers/camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @Input() cardsQuantity: number[] = [12,20,30];

  photo: Entry;

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public cameraService: CameraService,
    public file: File,
    public filePath: FilePath,
    public platform: Platform
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