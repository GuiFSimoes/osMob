import { HttpClient, HttpParams } from '@angular/common/http';
// import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiHttpService {
  url: string = './assets/mocks/providers';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any): Promise<any> {

    return new Promise((resolve, reject) => {

      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }

      // Support easy query params for GET requests
      if (params) {
        reqOpts.params = new HttpParams();
        for (let k in params) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
      this.http.get(this.url + '/' + endpoint, reqOpts)
        .subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject(null);
          }
        },
          error => {
            reject(error);
          });
    });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
