import { Injectable, NgZone } from "@angular/core";
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
export class ExploreService {

  constructor(private http: HttpClient, private zone: NgZone) { }

  getCategoryList(params): Observable<any>{
    return this.http.get(Globals.apiEndpoint+'all_employee/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token ')
    })
  }

}
