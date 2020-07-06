import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor() {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem("authorizationToken") != null) {     
            request = request.clone({
                setHeaders: { 
                    Authorization: sessionStorage.getItem("authorizationToken")
            }
        });
    }
    return next.handle(request);
    }
}