import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken') || '';
        let userEmail: any = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo') || '';
        userEmail = userEmail != '' ? JSON.parse(userEmail) : '';
        let headers = req.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');  //   'text/plain'   'application/json'  'application/x-www-form-urlencoded'
        if (token !== '') {
            headers = headers.append('Authorization', `Bearer ${token} ${userEmail}`);
        }
        const authReq = req.clone({ headers: headers });
        return next.handle(authReq);
    }
}
