import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DetalheOSTabPageRoutingModule } from './detalhe-os-tab.router.module';

import { DetalheOSTabPage } from './detalhe-os-tab';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DetalheOSTabPageRoutingModule
  ],
  declarations: [DetalheOSTabPage]
})
export class DetalhesOSTabPageModule {}
