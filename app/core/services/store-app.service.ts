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


  createChatSessionView(data) {
    return this.http.post(Globals.apiEndpoint + 'chats/', data)
  }

  // connectToApp(data, uri) {
  //   return this.http.patch(Globals.apiEndpoint + 'chats/' + uri + '/', data)
  // }

  getMessageListByApp(uri) {
    return this.http.get(Globals.apiEndpoint + 'chats/' + uri + '/messages/')
  }

  messageToApp(data, uri) {
    return this.http.post(Globals.apiEndpoint + 'chats/' + uri + '/messages/', data)
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
