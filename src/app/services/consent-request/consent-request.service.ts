import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsentRequest } from 'src/app/services/consent-request/consent-request';
import { WebHeader } from 'src/app/services/web-header';
import { WebRequest } from 'src/app/services/web-request';
import { WebResponse } from '../web-response';
import { ConfigService } from 'src/app/services/config/config-service';
import { Observable , throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsentRequestService {

  apiBaseUrl: string;
  loginPageUrl: string;
  aaApiUrl: String;

  constructor(public configService: ConfigService,
    private http: HttpClient) { 
      this.apiBaseUrl = this.configService.apiBaseUrl;
    }

    createFIUConsentRequest(consentRequest:ConsentRequest): Observable<ConsentRequest>{
      const header: WebHeader = {
        rid: localStorage.getItem("messageID"),
        ts: new Date(),
        channelId: 'finsense'
      };
     
      const request: WebRequest = {
        header: header,
        body: consentRequest
      };
      
      return this.http.post<ConsentRequest>(this.apiBaseUrl + '/ConsentIntentRequest',request).pipe(retry(1),
      catchError(this.handleError));
    }

    checkConsentStatus(consentHandleId,custId) {
      return this.http.get<WebResponse>(this.apiBaseUrl +'/ConsentStatus/' + consentHandleId+ '/' +custId).pipe(retry(1),
      catchError(this.handleInternalServerError));
    }

    getConsentDetails(consentHandleId) {
      return this.http.get<WebResponse>(this.apiBaseUrl +'/getConsentDetailsById/' + consentHandleId).pipe(retry(1),
      catchError(this.handleInternalServerError));
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
      window.alert("JWT expired!");
      window.location.href = '/login'
  
    }
    return throwError(errorMessage);
   }

   handleInternalServerError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if(error.status == 401){
      window.alert("JWT expired!");
      window.location.href = '/login'
    } else if(error.status == 500) {
        window.alert("Something went wrong!");
    }
    return throwError(errorMessage);
   }
}