import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

// import { FirstRunPage } from '../pages';
import { Settings, UsuarioService } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = '';
  configuracoes: any = {};

  @ViewChild(Nav) nav: Nav;
  pages: any[] = [
    { title: 'Lista OS', icon: 'list-box', component: 'ListMasterPage' },
    { title: 'Sair', icon: 'log-out', component: 'sair' },
    // { title: 'Teste', icon: 'construct', component: 'SearchPage' },

    /* { title: 'Tabs', component: 'TabsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Sair', component: 'SearchPage' } */
  ]

  constructor(
    private translate: TranslateService,
    private userService: UsuarioService,
    private platform: Platform,
    private settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) {

    this.aguardarPlataforma();
    this.initTranslate();
  }

  aguardarPlataforma() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.paginaInicial();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('pt-br');
    this.translate.use('pt-br'); // Set your language here

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  paginaInicial() {
    this.settings.load()
      .then(l => {
        this.configuracoes = l;
        if (this.configuracoes['pularTutarial'] === undefined || this.configuracoes['pularTutarial'] === null) {
          this.rootPage = 'TutorialPage';
        } else if (this.configuracoes['pularTutarial'] === true) {
          this.rootPage = 'WelcomePage';
        } else {
          this.rootPage = 'TutorialPage';
        }
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component !== 'sair') {
      this.nav.push(page.component);
    } else {
      this.userService.logout()
        .then(() => {
          this.nav.setRoot('WelcomePage');
        });
    }
  }
}
