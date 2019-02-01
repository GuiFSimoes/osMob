import { Injectable } from '@angular/core';
import { ApiHttpService } from '../apiHttp/apiHttp.service';
import { Cliente } from '../../models/cliente';

@Injectable()
export class ClienteService {

  constructor(private api: ApiHttpService) { }

  query(params?: any) {
    return this.api.get('cliente.json', params);
  }

  add(item: Cliente) {
    return this.api.put('cliente.json', item);
  }

  delete(item: Cliente) {
    return this.api.delete('cliente.json', item);
  }
}
