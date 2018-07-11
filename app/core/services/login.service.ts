import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as Globals from '../../core/globals';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    let options = this.createRequestHeader();
    return this.http.post(Globals.apiEndpoint + 'customer_login/', { data }, { headers: options })
  }
  private createRequestHeader() {
    let headers = new HttpHeaders();
    // let token = this.globals.getToken();
    // if (token != "") {
    //     headers.set("X-AUTH-TOKEN", token);
    // }
    headers.set("Accept", "application/json");
    //headers.set("AuthToken", "my-token");
    headers.set("Content-Type", "application/json");
    return headers;
}
}
