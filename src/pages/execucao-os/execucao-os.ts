import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';

import { OrdemServicoService, UsuarioService, ClienteService } from '../../providers';

import { OrdemServico } from '../../models/ordemServico';
import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { Colaborador } from '../../models/colaborador';
import { Cliente } from '../../models/cliente';

import { PopOverMenuOSComponent } from '../../components/pop-over-menu-os';

@IonicPage()
@Component({
  selector: 'page-execucao-os',
  templateUrl: 'execucao-os.html',
  // styleUrls: ['./execucao-os.scss']
})
export class ExecucaoOSPage {

  usuarioLogado: Colaborador;
  item: OrdemServico = new OrdemServico();
  cliente: Cliente = new Cliente();
  viewCtrl: ViewController;

  detalhesItem: Array<OrdemServicoDetalhe> = [];

  constructor(
    public navCtrl: NavController,
    public popCtrl: PopoverController,
    private navParams: NavParams,
    private userService: UsuarioService,
    private osService: OrdemServicoService
  ) {
    this.viewCtrl = this.navParams.get('viewCtrl');
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.usuarioLogado = this.userService._user;
    this.carregaDetalhesItem(this.item.AT_COD);
    // this.carregaCliente(this.item.CF_COD);
  }

  carregaDetalhesItem(codigo_os) {
    this.osService.queryDetalhes()
      .then(result => {
        this.detalhesItem = result.filter(x => x.AT_COD === codigo_os);
        // console.log('det: ', this.detalhesItem);
      });
  }

  voltarLista() {
    this.viewCtrl.dismiss();
  }

  async abrirMenuOpcoes(eventClick: any) {
    const popover = await this.popCtrl.create(PopOverMenuOSComponent, { status: this.item.AT_STATUS, origem: 'execucao' });
    return await popover.present({
      ev: eventClick,
      animate: true
    });
  }

}
