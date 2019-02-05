import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ExecucaoOSComentarioPage } from './execucao-os-comentario';

@NgModule({
  imports: [
    IonicPageModule.forChild(ExecucaoOSComentarioPage),
    TranslateModule.forChild()
  ],
  declarations: [
    ExecucaoOSComentarioPage,
  ],
  exports: [
    ExecucaoOSComentarioPage
  ]
})
export class ExecucaoOSComentarioPageModule { }
