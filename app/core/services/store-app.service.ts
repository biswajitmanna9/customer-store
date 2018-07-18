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
export class StoreAppService {

  constructor(private http: HttpClient) { }  

  getStoreAppDetails(id) {
    return this.http.get(Globals.apiEndpoint + 'app_all_details/' + id + '/')
  }
  

}
