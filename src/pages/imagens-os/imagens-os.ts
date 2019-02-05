import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';

import { PopOverMenuOSComponent } from '../../components/pop-over-menu-os';
import { FotoOrdemServico } from '../../models/fotoOrdemServico';
import { OrdemServicoService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-imagens-os',
  templateUrl: 'imagens-os.html',
  // styleUrls: ['imagens-os.scss']
})
export class ImagensOSPage {

  item: any;
  listaFotos: Array<FotoOrdemServico> = [];
  viewCtrl: ViewController;

  constructor(
    public navCtrl: NavController,
    public popCtrl: PopoverController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private osService: OrdemServicoService,
  ) {
    this.viewCtrl = this.navParams.get('viewCtrl');
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.osService.queryFotos()
      .then(itens => {
        this.listaFotos = itens.filter(x => x.AT_COD.toString() === this.item.AT_COD.toString());
      });
  }

  addItem() {
    const addModal = this.modalCtrl.create('ImagensOSAdicionarPage');
    addModal.onDidDismiss((itemRetorno: FotoOrdemServico) => {
      if (itemRetorno) {
        itemRetorno.FL_COD = this.item.FL_COD;
        itemRetorno.AT_COD = this.item.AT_COD;
        itemRetorno.AT_ITM = this.listaFotos.length + 1;
        this.listaFotos.push(itemRetorno);
      }
    });
    addModal.present();
  }

  deleteItem(foto) {
    console.log('del: ', foto);
  }

  voltarLista() {
    this.viewCtrl.dismiss();
  }

  openItem(foto: FotoOrdemServico) {
    const addModal = this.modalCtrl.create('ImagensOSVisualizarPage', { item: foto });
    addModal.present();
  }

  async abrirMenuOpcoes(eventClick: any) {
    const popover = await this.popCtrl.create(PopOverMenuOSComponent, { status: this.item.AT_STATUS, origem: 'imagem' });
    popover.onDidDismiss(x => this.retornoMenu(x));
    return await popover.present({
      ev: eventClick,
      animate: true
    });
  }

  retornoMenu(acaoClick) {
    if (acaoClick === 'adicionar_foto') {
      this.addItem();
    }
  }

}
