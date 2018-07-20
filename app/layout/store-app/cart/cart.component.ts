import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { SecureStorage } from "nativescript-secure-storage";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
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
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.secureStorage = new SecureStorage();
  }

  ngOnInit() {
    var full_location = this.location.path().split('/');
    this.app_id = full_location[2].trim();
    this.user_id = getString('user_id');
    this.secureStorage.get({
      key: "cart"
    }).then(
      value => {
        var data = JSON.parse(value);
        console.log(data);
        if (data != null) {
          var filteredData = data.filter(x => x.customer_id == this.user_id && x.app_id == this.app_id)
          this.customer_cart_data = filteredData;
        }
        else {
          this.customer_cart_data = [];
        }
        this.visible_key = true;
      }
    );
  }

  getDiscount(price, discounted_price) {
    return ((price - discounted_price) * 100) / 100 + '%';
  }
}