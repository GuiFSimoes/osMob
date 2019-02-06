import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams, DateTime } from 'ionic-angular';
import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@IonicPage()
@Component({
  selector: 'page-execucao-os-comentario',
  templateUrl: './execucao-os-comentario.html'
})
export class ExecucaoOSComentarioPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: OrdemServicoDetalhe;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private geoloc: Geolocation,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      comentario: ['', Validators.required],
      tempo_decorrido: [''],
      data_fim: [''],
      coordenadas: [''],
      deslocamento: ['3580'] // pegar coordenadas
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');

    // calcula o tempo decorrido!
    // this.item.AT_DATFIM = new Date().toLocaleString('pt-BR');
    const tempo = this.calculaDiferenca(this.item.AT_DATINI, new Date().toLocaleString('pt-BR'));
    this.form.patchValue({ 'tempo_decorrido': tempo });
    this.form.patchValue({ 'data_fim': this.item.AT_DATFIM });
    this.pegaCoordenadaAtual();
  }

  pegaCoordenadaAtual() {
    this.geoloc.getCurrentPosition().then((resp) => {
      this.form.patchValue({ 'coordenadas': resp.coords.latitude.toString() + '|' + resp.coords.longitude.toString() });
      // console.log('coordenadas: ', resp.coords.latitude.toString() + '|' + resp.coords.longitude.toString());
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  calculaDiferenca(tempo_ini: string, tempo_fim: string) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const ini = new Date(this.convertData(tempo_ini)).valueOf();
    const fim = new Date(this.convertData(tempo_fim)).valueOf();
    const diasCompletos = (fim - ini) / _MS_PER_DAY;
    const dias = Math.floor(diasCompletos);
    const horas = Math.floor((diasCompletos - dias) * 24);
    const minutos = Math.floor((((diasCompletos - dias) * 24) - horas) * 60);
    let retorno = dias != 0 ? dias + ' dia(s) ' : '';
    retorno += horas != 0 ? horas + ' hora(s) ' : '';
    retorno += minutos != 0 ? minutos + ' minuto(s)' : '';
    return retorno === '' ? '0' : retorno;
  }

  convertData(data: string) {
    const aux = data.split(' ')[0].split('/');
    return aux[2] + '/' + aux[1] + '/' + aux[0] + data.substr(10);
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss(null);
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
