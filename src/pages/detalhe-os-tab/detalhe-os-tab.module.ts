import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DetalheOSTabPage } from './detalhe-os-tab';

@NgModule({
  imports: [
    IonicPageModule.forChild(DetalheOSTabPage),
    TranslateModule.forChild()
  ],
  declarations: [
    DetalheOSTabPage
  ],
  exports: [
    DetalheOSTabPage
  ]
})
export class DetalhesOSTabPageModule {}
