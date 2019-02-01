import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DetalhesOSPage } from './detalhes-os';

@NgModule({
  imports: [
    IonicPageModule.forChild(DetalhesOSPage),
    TranslateModule.forChild()
  ],
  declarations: [
    DetalhesOSPage
  ],
  exports: [
    DetalhesOSPage
  ]
})
export class DetalhesOSPageModule {}
