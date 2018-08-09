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
export class ExploreService {

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'all_categories/')
  }

  getMostViewAppList(): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'most_viewed_app/')
  }

  getRatedAppList(): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'most_viewed_app/')
  }

  getAllAppList(params): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'search_app/' + params)
  }

  getUserDashboardAppList(id) {
    return this.http.get(Globals.apiEndpoint + 'customer_dashbord/' + id + '/')
  }

  appAttachAndDisattachToDashboard(data){
    return this.http.post(Globals.apiEndpoint + 'mapping_app_and_customer/', data)
  }

}
