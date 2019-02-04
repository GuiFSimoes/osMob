import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ImagensOSAdicionarPage } from './imagens-os-adicionar';

@NgModule({
  imports: [
    IonicPageModule.forChild(ImagensOSAdicionarPage),
    TranslateModule.forChild()
  ],
  declarations: [
    ImagensOSAdicionarPage,
  ],
  exports: [
    ImagensOSAdicionarPage
  ]
})
export class ImagensOSAdicionarPageModule { }
