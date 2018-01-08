
import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File, Entry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

@Injectable()
export class CameraService {

  constructor(
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public platform: Platform) {
  }

  getPhoto(source: number): Promise<Entry> {
    let cameraOptions: CameraOptions = {
      correctOrientation: true,
      quality: 100,
      saveToPhotoAlbum: false, // salva no album camera
      sourceType: source
    };

    return this.camera.getPicture(cameraOptions)
      .then((fileUri: string) => {  //fileUri é o destino da foto
        return this.saveFile(fileUri,cameraOptions.sourceType)
          .then((entry: Entry) => {                        
            return entry;
          })
      })
      .catch((error: Error) => {
        console.log("camera error:",error.message || error);
        return null;
      });
  }

  correctPathAndGetFileName(fileUri: string, sourceType: number): Promise<{oldFilePath: string, oldFileName: string}> {

    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

      return this.filePath.resolveNativePath(fileUri)
        .then((correctFileUri: string) => {

          return {
            oldFilePath: correctFileUri.substr(0, (correctFileUri.lastIndexOf('/') +1)),  // traz o índice da PRIMEIRA BARRA (da direita pra esquerda) -> traz o índice da última barra da string
            oldFileName: fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.lastIndexOf('?'))
          }

        })
        .catch((error: Error) => {
          console.log("erro no path file: ", error.message || error);
          return Promise.reject(error.message || error);
        })
    }

    return Promise.resolve({
      oldFilePath: fileUri.substr(0, fileUri.lastIndexOf('/') + 1),
      oldFileName: fileUri.substr(fileUri.lastIndexOf('/') + 1)
    });

  }

  private newFileName(oldFileName: string): string {
    let extension: string = oldFileName.substr(oldFileName.lastIndexOf('.')); // retorna um .jpg, .png
    return new Date().getTime() + extension; // concatena pra ficar: 124123123.jpg ou 643543.png
  }

  private saveFile(fileUri: string, sourceType: number): Promise<Entry> {
    return this.correctPathAndGetFileName(fileUri, sourceType)
      .then((data: {oldFilePath: string, oldFileName: string}) => {
        return this.file.copyFile(data.oldFilePath, data.oldFileName, this.file.dataDirectory, this.newFileName(data.oldFileName))
          .catch((error: Error) => {
            return Promise.reject(error);
          });
        })
        .catch((error: Error) => {
          return Promise.reject(error);
      });
  }

}
