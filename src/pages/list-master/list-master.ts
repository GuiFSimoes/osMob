import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { OrdemServico } from '../../models/ordemServico';
import { Colaborador } from '../../models/colaborador';
import { OrdemServicoService, UsuarioService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  filtro: string = '';
  listaItensOS: Array<OrdemServico> = [];
  listaFiltradaOS: Array<OrdemServico> = [];
  usuarioLogado: Colaborador;

  camposFiltro = ['AT_COD', 'AT_DES', 'AT_DATSOL', 'AT_STATUS_D'];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private osService: OrdemServicoService,
    private userService: UsuarioService
  ) { }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.usuarioLogado = this.userService._user;
    this.carregaLista();
  }

  carregaLista() {
    this.osService.query().then(retorno => {
      this.listaItensOS = this.listaFiltradaOS = retorno.filter(x => x.VD_COD === this.usuarioLogado.VD_COD);
      console.log('lista (comp): ', this.listaItensOS);
      console.log('lista (fil): ', this.listaFiltradaOS);
    });
  }

  transmitirItem(item) {
    console.log('trans: ', item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  abrirItem(item: any) {
    console.log('abrir: ', item);
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  filtrarLista() {
    if (this.filtro !== '') {
      let listaFiltrada = this.listaItensOS;
      const tempArray: Array<any> = [];
      listaFiltrada.forEach(item => {
        let flag = false;
        this.camposFiltro.forEach(campo => {
          if (this.accent_fold(item[campo].toString().toLowerCase()).match(this.accent_fold(this.filtro.toString().toLowerCase()))) {
            flag = true;
          }
        });
        if (flag) {
          tempArray.push(item);
        }
      });
      this.listaFiltradaOS = tempArray;
    } else {
      this.listaFiltradaOS = this.listaItensOS;
    }
  }

  /**remove acento */
  private accent_map = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
    'ç': 'c',                                                   // c
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
    'ñ': 'n',                                                   // n
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
    'ß': 's',                                                   // s
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
    'ÿ': 'y'                                                    // y
  };

  private accent_fold(s) {
    if (!s) { return ''; }
    s = s.toLowerCase();
    let ret = '';
    for (let i = 0; i < s.length; i++) {
      ret += this.accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;
  }

}
