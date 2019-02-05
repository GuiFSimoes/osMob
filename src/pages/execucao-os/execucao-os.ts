import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, ActionSheetController, ModalController } from 'ionic-angular';

import { OrdemServicoService, UsuarioService, ClienteService } from '../../providers';

import { OrdemServico } from '../../models/ordemServico';
import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { Colaborador } from '../../models/colaborador';
import { Cliente } from '../../models/cliente';

import { PopOverMenuOSComponent } from '../../components/pop-over-menu-os';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    public modalCtrl: ModalController,
    private geoloc: Geolocation,
    private actionSheetController: ActionSheetController,
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
        this.detalhesItem = result.filter(x => x.AT_COD.toString() === codigo_os.toString());
        console.log('det: ', this.detalhesItem);
      });
  }

  voltarLista() {
    this.viewCtrl.dismiss();
  }

  async abrirMenuOpcoes(eventClick: any) {
    const popover = await this.popCtrl.create(PopOverMenuOSComponent, { status: this.item.AT_STATUS, origem: 'execucao' });
    popover.onDidDismiss(x => this.retornoMenu(x));
    return await popover.present({
      ev: eventClick,
      animate: true
    });
  }

  retornoMenu(acaoClick) {
    if (acaoClick === 'iniciar_fase') {
      this.abrirActionSheet();
    } else if (acaoClick === 'fechar_fase') {
      const itemFechar = this.detalhesItem.find(x => x.AT_DATFIM === '');
      if (itemFechar) {
        this.fecharFase(itemFechar);
      } else {
        alert('Não há fase para fechar!');
      }
    } else if (acaoClick === 'fechar_os') {
      alert('Ordem de serviço fechada com sucesso!');
      this.voltarLista();
    } else if (acaoClick === 'deletar') {
      console.log('deletar os');
    }
  }

  async abrirActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Deslocamento',
        icon: 'pin',
        handler: () => this.iniciarFase('deslocamento')
      }, {
        text: 'Execução do serviço',
        icon: 'construct',
        handler: () => this.iniciarFase('execucao')
      }, {
        text: 'Parada',
        icon: 'hand',
        handler: () => this.iniciarFase('parada')
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => console.log('Cancel clicked')
      }]
    });
    await actionSheet.present();
  }

  iniciarFase(fase) {
    const novoItem: OrdemServicoDetalhe = new OrdemServicoDetalhe();
    
    novoItem.AT_COD = this.item.AT_COD;
    novoItem.AT_DATINI = new Date().toLocaleString('pt-BR');
    novoItem.AT_LOCAL_FIM = '';
    novoItem.AT_COMENTARIO = '';
    novoItem.AT_DATFIM = '';
    novoItem.AT_LOCAL_INI = '';

    if (fase === 'deslocamento') {
      novoItem.ATR_COD = 1;
    novoItem.AT_LOCAL_INI = 'Local inicial de deslocamento...';
    novoItem.ATR_FASE = 'Deslocamento';
    } else if (fase === 'execucao') {
      novoItem.ATR_COD = 2;
      novoItem.ATR_FASE = 'Execução';
    } else if (fase === 'parada') {
      novoItem.ATR_COD = 3;
      novoItem.ATR_FASE = 'Parada';
    }
    // this.pegaCoordenadaAtual(novoItem);
    this.detalhesItem.push(novoItem);
  }

  pegaCoordenadaAtual(item: OrdemServicoDetalhe) {
    this.geoloc.getCurrentPosition().then((resp) => {
      // this.form.patchValue({ 'coordenadas': resp.coords.latitude.toString() + '|' + resp.coords.longitude.toString() });
      item.AT_LOCAL_INI = resp.coords.latitude.toString() + '|' + resp.coords.longitude.toString();
      console.log('coordenadas: ', resp.coords.latitude.toString() + '|' + resp.coords.longitude.toString());
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  fecharFase(itemFechar: OrdemServicoDetalhe) {
    const comentarioModal = this.modalCtrl.create('ExecucaoOSComentarioPage', { item: itemFechar });
    comentarioModal.onDidDismiss((itemRetorno) => {
      if (itemRetorno) {
        itemFechar.AT_DATFIM = itemRetorno.data_fim;
        itemFechar.AT_COMENTARIO = itemRetorno.comentario;
        itemFechar.ATR_TEMPO = itemRetorno.tempo_decorrido;
        itemFechar.AT_LOCAL_FIM = itemRetorno.coordenadas;
        if (itemFechar.ATR_FASE === 'Deslocamento') {
          itemFechar.ATR_DISTANCIA = itemRetorno.deslocamento;;
        }
      }
    });
    comentarioModal.present();
  }

}
