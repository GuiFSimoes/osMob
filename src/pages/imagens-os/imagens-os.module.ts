import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ImagensOSPage } from './imagens-os';

@NgModule({
  imports: [
    IonicPageModule.forChild(ImagensOSPage),
    TranslateModule.forChild()
  ],
  declarations: [
    ImagensOSPage
  ],
  exports: [
    ImagensOSPage
  ]
})
export class ImagensOSPageModule {}
