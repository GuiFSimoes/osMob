import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ImagensOSVisualizarPage } from './imagens-os-visualizar';

@NgModule({
  declarations: [
    ImagensOSVisualizarPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagensOSVisualizarPage),
    TranslateModule.forChild()
  ],
  exports: [
    ImagensOSVisualizarPage
  ]
})
export class ImagensOSVisualizarPageModule { }
