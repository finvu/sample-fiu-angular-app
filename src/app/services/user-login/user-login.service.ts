import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { UserLogin } from './user-login';
import { Observable , throwError } from 'rxjs';
import { WebHeader } from '../web-header';
import { WebRequest } from '../web-request';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {

  apiBaseUrl: string;

  constructor(private http: HttpClient,
    public configService: ConfigService) {
      this.apiBaseUrl = this.configService.apiBaseUrl;
  }

  userLogin(userLogin:UserLogin): Observable<UserLogin> {
    const header: WebHeader = {
      rid: localStorage.getItem("messageID"),
      ts: new Date(),
      channelId: 'finsense'
    };

    const request: WebRequest = {
      header: header,
      body: userLogin
    };
    return this.http.post<UserLogin>(this.apiBaseUrl +'/User/Login', request).pipe (retry(1),
    catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if(error.status == 401){
      console.log("Invalid credentials")
    }
    return throwError(errorMessage);
  }
}
