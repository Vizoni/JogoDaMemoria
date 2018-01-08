import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertService {

  constructor(
    public alertCtrl: AlertController
  ) {
    console.log('Hello AlertProvider Provider');
  }

  alert: Alert;

  defaultErrorAlert(): void {
    this.alert = this.alertCtrl.create({
      title: 'Ooops...',
      subTitle: 'Algo deu errado! Tente novamente mais tarde.',
      buttons: ['OK']
    });
    this.alert.present();
  }

  basicAlert(title: string, message: string): void {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    this.alert.present();
  }

}
