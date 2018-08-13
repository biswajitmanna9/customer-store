import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { SecureStorage } from "nativescript-secure-storage";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { StoreAppService, OrderModule, OrderDetails } from "../../../core/services/store-app.service";
import { Router } from "@angular/router";
import {
  Paytm,
  Order,
  TransactionCallback,
  IOSCallback
} from "@nstudio/nativescript-paytm";
@Component({
  selector: "cart",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ['./cart.component.css']
})
export class StoreAppCartComponent {
  app_id: string;
  secureStorage: SecureStorage;
  customer_cart_data: any;
  user_id: string;
  visible_key: boolean;
  total_item_price: number;
  total_packing_price: number;
  total_price: number;
  all_cart_data: any;
  order: OrderModule;
  paytmFormDetails: any;
  paytm: Paytm;
  orderToPaytm: Order = {
    MID: "",
    ORDER_ID: "",
    CUST_ID: "",
    INDUSTRY_TYPE_ID: "",
    CHANNEL_ID: "",
    TXN_AMOUNT: "",
    WEBSITE: "",
    CALLBACK_URL: "",
    CHECKSUMHASH: ""
  };
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private storeAppService: StoreAppService,
    private router: Router
  ) {
    this.secureStorage = new SecureStorage();
    this.order = new OrderModule();
  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
    this.user_id = getString('user_id');
    this.populateData();
    this.paytm = new Paytm();
  }

  populateData() {
    this.secureStorage.get({
      key: "cart"
    }).then(
      value => {
        var data = JSON.parse(value);
        console.log(data);
        if (data != null) {
          this.all_cart_data = data;
          var filteredData = data.filter(x => x.customer_id == this.user_id && x.app_id == this.app_id)
          this.customer_cart_data = filteredData;
          this.getTotalItemPrice();
          this.getTotalPackingPrice();
          this.visible_key = true;
        }
        else {
          this.customer_cart_data = [];
        }
      }
    );
  }

  getDiscount(price, discounted_price) {
    return Math.floor(((price - discounted_price) * 100) / price) + '%';
  }

  increment(i) {
    var qty = this.customer_cart_data[i].quantity;
    this.customer_cart_data[i].quantity = qty + 1;
    var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == this.customer_cart_data[i].product_id);
    if (index != -1) {
      this.all_cart_data[index].quantity = qty + 1;
      this.setCartData()
    }
  }

  decrement(i) {
    var qty = this.customer_cart_data[i].quantity;
    if (qty > 1) {
      this.customer_cart_data[i].quantity = qty - 1;
      var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == this.customer_cart_data[i].product_id);
      if (index != -1) {
        this.all_cart_data[index].quantity = qty - 1;
        this.setCartData()
      }
    }
    else {
      this.remove(this.customer_cart_data[i].product_id)
    }
  }

  getTotalItemPrice() {
    this.total_item_price = 0;
    this.customer_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
      }
      else {
        this.total_item_price += (x.price * x.quantity);
      }
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  remove(id) {
    var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == id);
    console.log(index)
    if (index != -1) {
      this.all_cart_data.splice(index, 1);
      this.customer_cart_data.splice(index, 1);
      this.setCartData()
    }
  }

  setCartData() {
    this.secureStorage.set({
      key: 'cart',
      value: JSON.stringify(this.all_cart_data)
    }).then(success => {
      console.log(success)
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    });
  }


  orderPlace() {
    // this.order.customer = this.user_id;
    // this.order.price = this.total_item_price + this.total_packing_price;
    // this.order.appmaster = this.app_id
    // var details_data = new OrderDetails();
    // var all_details_data = []
    // this.customer_cart_data.forEach(x => {
    //   details_data.appmaster = x.app_id;
    //   if (x.discounted_price > 0) {
    //     details_data.unit_price = x.discounted_price;
    //   }
    //   else {
    //     details_data.unit_price = x.price;
    //   }
    //   details_data.quantity = x.quantity;
    //   details_data.product = x.product_id;
    //   details_data.packaging_cost = x.packing_charges;
    //   details_data.uom = "0";
    //   details_data.IGST = "0";
    //   details_data.CGST = "0";
    //   all_details_data.push(details_data);
    //   var index = this.all_cart_data.findIndex(y => y.customer_id == this.user_id && y.app_id == this.app_id && y.product_id == x.product_id);
    //   if (index != -1) {
    //     this.all_cart_data.splice(index, 1);
    //   }
    // })
    // this.order.order_details = all_details_data;
    // this.setCartData();
    // this.storeAppService.createOrder(this.order).subscribe(
    //   res => {
    //     console.log(res)
    //     this.router.navigate(['/store-app/', this.app_id, 'payment'])
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    this.router.navigate(['/store-app/', this.app_id, 'payment'])
    // this.getPaytmFormValue(this.order.price)
  }  

  // getPaytmFormValue(amount: number) {
  //   this.storeAppService.paytmFormValue(amount).subscribe(
  //     res => {
  //       console.log(res)
  //       this.paytmFormDetails = res;
  //       this.payViaPaytm();
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  // // paytm
  // payViaPaytm() {
  //   this.paytm.setIOSCallbacks({
  //     didFinishedResponse: function (response) {
  //       console.log(response);
  //     },
  //     didCancelTransaction: function () {
  //       console.log("User cancelled transaction");
  //     },
  //     errorMissingParameterError: function (error) {
  //       console.log(error);
  //     }
  //   });
  //   this.orderToPaytm = {
  //     MID: this.paytmFormDetails['MID'],
  //     ORDER_ID: this.paytmFormDetails['ORDER_ID'],
  //     CUST_ID: this.paytmFormDetails['CUST_ID'],
  //     INDUSTRY_TYPE_ID: this.paytmFormDetails['INDUSTRY_TYPE_ID'],
  //     CHANNEL_ID: this.paytmFormDetails['CHANNEL_ID'],
  //     TXN_AMOUNT: this.paytmFormDetails['TXN_AMOUNT'],
  //     WEBSITE: this.paytmFormDetails['WEBSITE'],
  //     CALLBACK_URL: this.paytmFormDetails['CALLBACK_URL'],
  //     CHECKSUMHASH: this.paytmFormDetails['CHECKSUMHASH']
  //   };
  //   this.paytm.createOrder(this.orderToPaytm);
  //   this.paytm.initialize("STAGING");
  //   this.paytm.startPaymentTransaction({
  //     someUIErrorOccurred: function (inErrorMessage) {
  //       console.log(inErrorMessage);
  //     },
  //     onTransactionResponse: function (inResponse) {
  //       console.log(inResponse);
  //     },
  //     networkNotAvailable: function () {
  //       console.log("Network not available");
  //     },
  //     clientAuthenticationFailed: function (inErrorMessage) {
  //       console.log(inErrorMessage);
  //     },
  //     onErrorLoadingWebPage: function (
  //       iniErrorCode,
  //       inErrorMessage,
  //       inFailingUrl
  //     ) {
  //       console.log(iniErrorCode, inErrorMessage, inFailingUrl);
  //     },
  //     onBackPressedCancelTransaction: function () {
  //       console.log("User cancelled transaction by pressing back button");
  //     },
  //     onTransactionCancel: function (inErrorMessage, inResponse) {
  //       console.log(inErrorMessage, inResponse);
  //     }
  //   });
  // }
}