import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

// import { ApiHttpService } from '../apiHttp/apiHttp.service';
// import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { Colaborador } from '../../models/colaborador';
import { Settings } from '../settings/settings';

@Injectable()
export class UsuarioService {
  _user: Colaborador;

  constructor(private setings: Settings) { }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    return this.setings.setValue('UsuarioLogado', null);
  }

  /**
   * Process a login/signup response to store user data
   */
  setUser(resp) {
    this._user = resp;
    this.setings.setValue('UsuarioLogado', resp);
  }
  getUserStorage() {
    return this.setings.getValue('UsuarioLogado')
      .then(_u => {
        this._user = _u;
      });
  }

}
