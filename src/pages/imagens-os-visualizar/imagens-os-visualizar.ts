import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoOrdemServico } from '../../models/fotoOrdemServico';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'imagens-os-visualizar.html'
})
export class ImagensOSVisualizarPage {
  
  item: FotoOrdemServico;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get('item');
  }

}
