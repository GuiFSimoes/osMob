import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pop-over-menu-os',
  template: `
    <ion-list>
      <ion-list-header>Ações</ion-list-header>
      <button ion-item *ngFor="let item of lista" (click)="acao(item.click)">{{item.label}}</button>
      <button ion-item (click)="acao('')">{{ 'INICIAR_FASE' | translate }}</button>
      <button ion-item (click)="acao('')">{{ 'FECHAR_FASE' | translate }}</button>
      <button ion-item (click)="acao('fechar_os')">{{ 'FECHAR_OS' | translate }}</button>
      <button ion-item (click)="acao('adicionar')">{{ 'ADD_FOTO' | translate }}</button>
    </ion-list>`
})
export class PopOverMenuOSComponent {

  stausOS = '';
  paginaOrigem = '';

  transmitirLabel = '';
  iniciarLabel = '';
  fecharLabel = '';
  fecharOSLabel = '';
  addFotoLabel = '';
  deletarLabel = '';
  retransmitirLabel = '';

  listButtons: any = [
    { click: 'transmitir', label: this.transmitirLabel, origem: 'detalhes', status: '3' },
    { click: 'retransmitir', label: this.retransmitirLabel, origem: 'detalhes', status: '4' },
    { click: 'iniciar_fase', label: this.iniciarLabel, origem: 'execucao', status: '1|2' },
    { click: 'fechar_fase', label: this.fecharLabel, origem: 'execucao', status: '1|2' },
    { click: 'fechar_os', label: this.fecharOSLabel, origem: 'execucao|detalhes', status: '2' },
    { click: 'adicionar_foto', label: this.addFotoLabel, origem: 'imagem', status: '1|2' },
    { click: 'deletar', label: this.deletarLabel, origem: 'execucao', status: '4|5' },
  ];

  lista: any = [];

  constructor(
    public viewCtrl: ViewController,
    public translateService: TranslateService,
    private navParams: NavParams,
  ) {
    this.stausOS = navParams.get('status').toString();
    this.paginaOrigem = navParams.get('origem').toString();

    translateService.get(['TRANSMITIR', 'INICIAR_FASE', 'FECHAR_FASE', 'FECHAR_OS', 'ADD_FOTO', 'DELETAR', 'RETRANSMITIR']).subscribe(values => {
      this.transmitirLabel = values['TRANSMITIR'];
      this.retransmitirLabel = values['RETRANSMITIR'];
      this.iniciarLabel = values['INICIAR_FASE'];
      this.fecharLabel = values['FECHAR_FASE'];
      this.fecharOSLabel = values['FECHAR_OS'];
      this.addFotoLabel = values['ADD_FOTO'];
      this.deletarLabel = values['DELETAR'];
    });

    this.filtrarLista();
  }

  filtrarLista() {
    this.lista = this.listButtons.filter(x => x.origem.match(this.paginaOrigem) && x.status.match(this.stausOS));
  }

  acao(evento) {
    this.viewCtrl.dismiss(evento);
  }
}
