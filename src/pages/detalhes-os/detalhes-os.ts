import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController, NavParams, ViewController } from 'ionic-angular';

import { OrdemServicoService, UsuarioService, ClienteService } from '../../providers';

import { OrdemServico } from '../../models/ordemServico';
// import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { Colaborador } from '../../models/colaborador';
import { Cliente } from '../../models/cliente';
import { PopOverMenuOSComponent } from '../../components/pop-over-menu-os';

@IonicPage()
@Component({
  selector: 'page-detalhes-os',
  templateUrl: 'detalhes-os.html',
  // styleUrls: ['./detalhes-os.scss']
})
export class DetalhesOSPage {

  usuarioLogado: Colaborador;
  item: OrdemServico = new OrdemServico();
  cliente: Cliente = new Cliente();
  viewCtrl: ViewController;

  constructor(
    public navCtrl: NavController,
    public popCtrl: PopoverController,
    private navParams: NavParams,
    private userService: UsuarioService,
    private clienteService: ClienteService,
    // private osService: OrdemServicoService
  ) {
    this.viewCtrl = this.navParams.get('viewCtrl');
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.usuarioLogado = this.userService._user;
    // this.carregaDetalhesItem(this.item.AT_COD);
    this.carregaCliente(this.item.CF_COD);
  }

  /* carregaDetalhesItem(codigo_os) {
    this.osService.queryDetalhes()
      .then(result => {
        this.detalhesItem = result.filter(x => x.AT_COD === codigo_os);
        console.log('det: ', this.detalhesItem);
      });
  } */

  carregaCliente(cod_cliente) {
    this.clienteService.query()
      .then(lstClientes => {
        this.cliente = lstClientes.find(x => x.CF_COD === cod_cliente);
      });
  }

  async abrirMenuOpcoes(eventClick: any) {
    const popover = await this.popCtrl.create(PopOverMenuOSComponent, { status: this.item.AT_STATUS, origem: 'detalhes' });
    return await popover.present({
      ev: eventClick,
      animate: true
    });
  }

  voltarLista() {
    this.viewCtrl.dismiss();
  }

}
