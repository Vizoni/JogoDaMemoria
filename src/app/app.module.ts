import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AlertService } from '../providers/alert/alert';
import { Camera } from '@ionic-native/camera';
import { CameraService } from '../providers/camera/camera';
import { CardsPage } from './../pages/cards/cards';
import { DeckService } from '../providers/deck/deck';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    CardsPage,
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CardsPage,
    MyApp,
    HomePage
  ],
  providers: [
    AlertService,
    Camera,
    CameraService,
    DeckService,
    File,
    FilePath,
    ImagePicker,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
