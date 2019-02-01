import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrdemServicoService, UsuarioService, ClienteService } from '../../providers';

import { OrdemServico } from '../../models/ordemServico';
import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { Colaborador } from '../../models/colaborador';
import { Cliente } from '../../models/cliente';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  usuarioLogado: Colaborador;
  item: OrdemServico;
  cliente: Cliente;
  detalhesItem: Array<OrdemServicoDetalhe> = [];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private userService: UsuarioService,
    private clienteService: ClienteService,
    private osService: OrdemServicoService
  ) {
    // this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    console.log('item recuperado: ', this.item);
    this.usuarioLogado = this.userService._user;
    this.carregaDetalhesItem(this.item.AT_COD);
    this.carregaCliente(this.item.CF_COD);
  }

  carregaDetalhesItem(codigo_os) {
    this.osService.queryDetalhes()
      .then(result => {
        this.detalhesItem = result.filter(x => x.AT_COD === codigo_os);
        console.log('det: ', this.detalhesItem);
      });
  }

  carregaCliente(cod_cliente) {
    this.clienteService.query()
      .then(lstClientes => {
        this.cliente = lstClientes.find(x => x.CF_COD === cod_cliente);
      });
  }


}
