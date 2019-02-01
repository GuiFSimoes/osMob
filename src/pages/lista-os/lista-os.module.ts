import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListaOSPage } from './lista-os';

@NgModule({
  imports: [
    IonicPageModule.forChild(ListaOSPage),
    TranslateModule.forChild()
  ],
  declarations: [
    ListaOSPage,
  ],
  exports: [
    ListaOSPage
  ]
})
export class ListaOSPageModule { }
