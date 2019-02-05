import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// import { Settings, User, Api, FirebaseAutenticacao } from '../providers';
import { MyApp } from './app.component';
import {
  AuthInterceptorService,
  AutenticacaoService,
  OrdemServicoService,
  UsuarioService,
  ApiHttpService,
  ClienteService,
  Settings
} from '../providers';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { PopOverMenuOSComponent } from '../components/pop-over-menu-os';
const menuComponent = [PopOverMenuOSComponent];

export function provideSettings(storage: Storage) {
  /**
   * Configurações iniciais do sistema
   */
  return new Settings(storage, {
    telaTutorial: 'WelcomePage',
    telaBoasVindas: 'TutorialPage'
  });
}

@NgModule({
  declarations: [
    MyApp,
    ...menuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...menuComponent
  ],
  providers: [
    Camera,
    Geolocation,
    SplashScreen,
    StatusBar,
    ApiHttpService,
    AutenticacaoService,
    OrdemServicoService,
    UsuarioService,
    ClienteService,

    // Keep this to enable Ionic's runtime error handling during development
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
