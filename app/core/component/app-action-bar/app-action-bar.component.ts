import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { StoreAppService } from "../../services/store-app.service";
import { SecureStorage } from "nativescript-secure-storage";

@Component({
    selector: "app-action-bar",
    moduleId: module.id,
    templateUrl: "./app-action-bar.component.html",
    styleUrls: ['./app-action-bar.component.css']
})
export class AppActionBarComponent implements OnInit {
    app_details: any;
    product_list: any = [];
    secureStorage: SecureStorage;
    @Input('appId') appId: string;
    visible_key: boolean;
    isLoggedin: boolean;
    all_cart_data: any;
    user_id: string;
    customer_cart_data: any;
    serviceType;
    cartStatus:boolean;
    constructor(
        private _routerExtensions: RouterExtensions,
        private storeAppService: StoreAppService,
        private routerExtensions: RouterExtensions
    ) {
        this.secureStorage = new SecureStorage();
        storeAppService.getCartStatus.subscribe(status => this.changeCartStatus(status));
    }

    private changeCartStatus(status: boolean): void {
        
        this.cartStatus = status;
        console.log(this.cartStatus)
        if (this.cartStatus == true) {
           
            this.ngOnInit();
        }
        else{
            this.ngOnInit();
        }

        //alert(this.userName)
    }
    ngOnInit() {
        if(getBoolean('isLoggedin')){
            this.isLoggedin = getBoolean('isLoggedin');
            // alert(this.isLoggedin)
        }
        this.user_id = getString('user_id');
        this.getAppDetails(this.appId);
        this.populateData();
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
              var filteredData = data.filter(x => x.customer_id == this.user_id && x.app_id == this.appId)
              this.customer_cart_data = filteredData;
              
              this.visible_key = true;
            }
            else {
              this.customer_cart_data = [];
              this.visible_key = true;
            }
          }
        );
      }

    getAppDetails(id) {
        this.storeAppService.getStoreAppDetails(id).subscribe(
            res => {
                this.app_details = res;
                if (this.app_details.is_product_service) {
                    this.serviceType = this.app_details.is_product_service;
                }
                else {
                    this.serviceType = 1
                }
                this.app_details.app_product_categories.forEach(x => {
                    x.products.forEach(y => {
                        this.product_list.push(y)
                    })
                })
                console.log(res)
                console.log(this.product_list)
                this.visible_key = true;
            },
            error => {
                console.log(error)
            }
        )
    }
    goBack() {
        this.routerExtensions.back();
    }

    logout(){
        clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    }

}