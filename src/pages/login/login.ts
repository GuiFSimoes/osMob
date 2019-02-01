import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';

import { AutenticacaoService, UsuarioService } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { email: string, senha: string } = {
    email: '',
    senha: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginSucessoString: string;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public user: UsuarioService,
    public toastCtrl: ToastController,
    public authService: AutenticacaoService,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('LOGIN_SUCESSO').subscribe((value) => {
      this.loginSucessoString = value;
    });

    // Verifica se exsite um usuário logado na aplicação
    this.verificarLogado();
  }

  private verificarLogado() {
    this.user.getUserStorage()
      .then(() => {
        // console.log('login: ', this.user._user);
        if (this.user._user !== undefined && this.user._user !== null) {
          this.navCtrl.setRoot('ListMasterPage');
        }
      });
  }

  // Attempt to login in through our User service
  doLogin() {

    const logar = this.authService.login(this.account);
    if (logar) {
      this.navCtrl.setRoot('ListMasterPage');
      let toast = this.toastCtrl.create({
        message: this.loginSucessoString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
