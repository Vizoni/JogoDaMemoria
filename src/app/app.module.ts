import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { CardsPage } from './../pages/cards/cards';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CameraService } from '../providers/camera/camera';

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
    Camera,
    CameraService,
    File,
    FilePath,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
