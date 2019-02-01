import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ExecucaoOSPage } from './execucao-os';

@NgModule({
  imports: [
    IonicPageModule.forChild(ExecucaoOSPage),
    TranslateModule.forChild()
  ],
  declarations: [
    ExecucaoOSPage
  ],
  exports: [
    ExecucaoOSPage
  ]
})
export class ExecucaoOSPageModule {}
