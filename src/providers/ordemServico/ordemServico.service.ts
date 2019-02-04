import { Injectable } from '@angular/core';

import { OrdemServico } from '../../models/ordemServico';
import { OrdemServicoDetalhe } from '../../models/ordemServicoDetalhe';
import { ApiHttpService } from '../apiHttp/apiHttp.service';

@Injectable()
export class OrdemServicoService {

  constructor(private api: ApiHttpService) { }

  query(params?: any) {
    return this.api.get('ordemServico.json', params);
  }

  queryDetalhes(params?: any) {
    return this.api.get('ordemServicoDetalhe.json', params);
  }

  queryFotos(params?: any) {
    return this.api.get('ordemServicoFoto.json', params);
  }

  addOrdem(item: OrdemServico) {
    return this.api.put('ordemServico.json', item);
  }

  addDetalheOrdem(itemDetalhe: OrdemServicoDetalhe) {
    return this.api.put('ordemServicoDetalhe.json', itemDetalhe);
  }

  deleteOrdem(item: OrdemServico) {
    return this.api.delete('ordemServico.json', item);
  }

  deleteOrdemDetalhe(itemDetalhe: OrdemServicoDetalhe) {
    return this.api.delete('ordemServicoDetalhe.json', itemDetalhe);
  }
}
