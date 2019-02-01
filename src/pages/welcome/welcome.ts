import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { UsuarioService } from '../../providers';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public menu: MenuController,
    public user: UsuarioService,
    public navCtrl: NavController
  ) {
    // Verifica se exsite um usuário logado na aplicação
    this.verificarLogado();
  }

  private verificarLogado() {
    this.user.getUserStorage()
      .then(() => {
        // console.log('welcome: ', this.user._user);
        if (this.user._user !== undefined && this.user._user !== null) {
          this.navCtrl.setRoot('ListaOSPage');
        }
      });
  }

  login() {
    this.navCtrl.push('LoginPage');
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
