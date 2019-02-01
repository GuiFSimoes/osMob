import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { ApiHttpService } from '../apiHttp/apiHttp.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Colaborador } from '../../models/colaborador';

@Injectable()
export class AutenticacaoService {

  private listaCol: Colaborador[];

  constructor(
    private api: ApiHttpService,
    private user: UsuarioService
  ) { 
    this.carregarColaboradores();
  }

  carregarColaboradores() {
    this.api.get('colaborador.json')
      .then(resp => {
        // console.log('response: ', resp);
        this.listaCol = resp;
      });
  }

  login(conta: any) {

    // console.log(this.user.login(conta));
    const usuarioLogado = this.listaCol.find(x => x.VD_SENHA === conta.senha && x.VD_EMAIL === conta.email);

    if (usuarioLogado) {
      this.user.setUser(usuarioLogado);
      return true;
    } else {
      return false;
    }
  }

}
