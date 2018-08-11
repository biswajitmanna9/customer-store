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

  createOrder(data) {
    return this.http.post(Globals.apiEndpoint + 'create_orders/', data)
  }

  createChatSessionView(param, data) {
    return this.http.post(Globals.apiEndpoint + 'messages/' + param, data)
  }

  getMessageListByApp(thread) {
    return this.http.get(Globals.apiEndpoint + 'messages/' + thread + "/")
  }
  
  getAppRating(customer, app_master) {
    return this.http.get(Globals.apiEndpoint + 'search_rating/?customer=' + customer + '&app_master=' + app_master)
  }

  appRate(data) {
    return this.http.post(Globals.apiEndpoint + 'add_rating/', data)
  }

  paytmFormValue(order_amount): Observable<any> {
    return this.http.get(Globals.apiEndpoint + 'get_payment_details/?order_amount=' + order_amount + '&type=app')
  }

}


export class OrderModule {
  customer: string;
  price: number;
  order_details: OrderDetails[]
}
export class OrderDetails {
  quantity: number;
  unit_price: string;
  IGST: string;
  CGST: string;
  packaging_cost: string;
  uom: string;
  appmaster: number;
  product: number
}
