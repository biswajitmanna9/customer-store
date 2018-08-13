"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("@angular/router");
var nativescript_paytm_1 = require("@nstudio/nativescript-paytm");
var StoreAppPaymentComponent = /** @class */ (function () {
    function StoreAppPaymentComponent(route, location, storeAppService, router) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
        this.orderToPaytm = {
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
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
        this.order = new store_app_service_1.OrderModule();
    }
    StoreAppPaymentComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.populateData();
        this.paytm = new nativescript_paytm_1.Paytm();
    };
    StoreAppPaymentComponent.prototype.populateData = function () {
        var _this = this;
        this.secureStorage.get({
            key: "cart"
        }).then(function (value) {
            var data = JSON.parse(value);
            console.log(data);
            if (data != null) {
                _this.all_cart_data = data;
                var filteredData = data.filter(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id; });
                _this.customer_cart_data = filteredData;
                _this.getTotalItemPrice();
                _this.getTotalPackingPrice();
                _this.visible_key = true;
            }
            else {
                _this.customer_cart_data = [];
            }
        });
    };
    // getDiscount(price, discounted_price) {
    //     return Math.floor(((price - discounted_price) * 100) / price) + '%';
    // }
    // increment(i) {
    //     var qty = this.customer_cart_data[i].quantity;
    //     this.customer_cart_data[i].quantity = qty + 1;
    //     var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == this.customer_cart_data[i].product_id);
    //     if (index != -1) {
    //         this.all_cart_data[index].quantity = qty + 1;
    //         this.setCartData()
    //     }
    // }
    // decrement(i) {
    //     var qty = this.customer_cart_data[i].quantity;
    //     if (qty > 1) {
    //         this.customer_cart_data[i].quantity = qty - 1;
    //         var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == this.customer_cart_data[i].product_id);
    //         if (index != -1) {
    //             this.all_cart_data[index].quantity = qty - 1;
    //             this.setCartData()
    //         }
    //     }
    //     else {
    //         this.remove(this.customer_cart_data[i].product_id)
    //     }
    // }
    StoreAppPaymentComponent.prototype.getTotalItemPrice = function () {
        var _this = this;
        this.total_item_price = 0;
        this.customer_cart_data.forEach(function (x) {
            if (x.discounted_price > 0) {
                _this.total_item_price += (x.discounted_price * x.quantity);
            }
            else {
                _this.total_item_price += (x.price * x.quantity);
            }
        });
    };
    StoreAppPaymentComponent.prototype.getTotalPackingPrice = function () {
        var _this = this;
        this.total_packing_price = 0;
        this.customer_cart_data.forEach(function (x) {
            _this.total_packing_price += x.packing_charges;
        });
    };
    // remove(id) {
    //     var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.app_id == this.app_id && x.product_id == id);
    //     console.log(index)
    //     if (index != -1) {
    //         this.all_cart_data.splice(index, 1);
    //         this.customer_cart_data.splice(index, 1);
    //         this.setCartData()
    //     }
    // }
    StoreAppPaymentComponent.prototype.setCartData = function () {
        var _this = this;
        this.secureStorage.set({
            key: 'cart',
            value: JSON.stringify(this.all_cart_data)
        }).then(function (success) {
            console.log(success);
            _this.getTotalItemPrice();
            _this.getTotalPackingPrice();
        });
    };
    StoreAppPaymentComponent.prototype.orderPlace = function () {
        var _this = this;
        this.order.customer = this.user_id;
        this.order.price = this.total_item_price + this.total_packing_price;
        this.order.appmaster = this.app_id;
        var details_data = new store_app_service_1.OrderDetails();
        var all_details_data = [];
        this.customer_cart_data.forEach(function (x) {
            details_data.appmaster = x.app_id;
            if (x.discounted_price > 0) {
                details_data.unit_price = x.discounted_price;
            }
            else {
                details_data.unit_price = x.price;
            }
            details_data.quantity = x.quantity;
            details_data.product = x.product_id;
            details_data.packaging_cost = x.packing_charges;
            details_data.uom = "0";
            details_data.IGST = "0";
            details_data.CGST = "0";
            all_details_data.push(details_data);
            var index = _this.all_cart_data.findIndex(function (y) { return y.customer_id == _this.user_id && y.app_id == _this.app_id && y.product_id == x.product_id; });
            if (index != -1) {
                _this.all_cart_data.splice(index, 1);
            }
        });
        this.order.order_details = all_details_data;
        // this.setCartData();
        // this.storeAppService.createOrder(this.order).subscribe(
        //     res => {
        //         console.log(res)
        //         // this.router.navigate(['/store-app/', this.app_id, 'payment'])
        //     },
        //     error => {
        //         console.log(error)
        //     }
        // )
        // this.getPaytmFormValue(this.order.price)
    };
    StoreAppPaymentComponent.prototype.getPaytmFormValue = function (amount) {
        var _this = this;
        this.storeAppService.paytmFormValue(amount).subscribe(function (res) {
            console.log(res);
            _this.paytmFormDetails = res;
            _this.payViaPaytm();
        }, function (error) {
            console.log(error);
        });
    };
    // paytm
    StoreAppPaymentComponent.prototype.payViaPaytm = function () {
        this.paytm.setIOSCallbacks({
            didFinishedResponse: function (response) {
                console.log(response);
            },
            didCancelTransaction: function () {
                console.log("User cancelled transaction");
            },
            errorMissingParameterError: function (error) {
                console.log(error);
            }
        });
        this.orderToPaytm = {
            MID: this.paytmFormDetails['MID'],
            ORDER_ID: this.paytmFormDetails['ORDER_ID'],
            CUST_ID: this.paytmFormDetails['CUST_ID'],
            INDUSTRY_TYPE_ID: this.paytmFormDetails['INDUSTRY_TYPE_ID'],
            CHANNEL_ID: this.paytmFormDetails['CHANNEL_ID'],
            TXN_AMOUNT: this.paytmFormDetails['TXN_AMOUNT'],
            WEBSITE: this.paytmFormDetails['WEBSITE'],
            CALLBACK_URL: this.paytmFormDetails['CALLBACK_URL'],
            CHECKSUMHASH: this.paytmFormDetails['CHECKSUMHASH']
        };
        this.paytm.createOrder(this.orderToPaytm);
        this.paytm.initialize("STAGING");
        this.paytm.startPaymentTransaction({
            someUIErrorOccurred: function (inErrorMessage) {
                console.log(inErrorMessage);
            },
            onTransactionResponse: function (inResponse) {
                console.log(inResponse);
            },
            networkNotAvailable: function () {
                console.log("Network not available");
            },
            clientAuthenticationFailed: function (inErrorMessage) {
                console.log(inErrorMessage);
            },
            onErrorLoadingWebPage: function (iniErrorCode, inErrorMessage, inFailingUrl) {
                console.log(iniErrorCode, inErrorMessage, inFailingUrl);
            },
            onBackPressedCancelTransaction: function () {
                console.log("User cancelled transaction by pressing back button");
            },
            onTransactionCancel: function (inErrorMessage, inResponse) {
                console.log(inErrorMessage, inResponse);
            }
        });
    };
    StoreAppPaymentComponent = __decorate([
        core_1.Component({
            selector: 'payment',
            moduleId: module.id,
            templateUrl: "payment.component.html",
            styleUrls: ["payment.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService,
            router_2.Router])
    ], StoreAppPaymentComponent);
    return StoreAppPaymentComponent;
}());
exports.StoreAppPaymentComponent = StoreAppPaymentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQXNHO0FBQ3RHLDBDQUF5QztBQUN6QyxrRUFLcUM7QUFPckM7SUF3Qkksa0NBQ1ksS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmMUIsaUJBQVksR0FBVTtZQUNsQixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUM7UUFPRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkNBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSwrQkFBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENB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LEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFoUFEsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO3lDQTBCcUIsdUJBQWM7WUFDWCxpQkFBUTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07T0E1QmpCLHdCQUF3QixDQWlQcEM7SUFBRCwrQkFBQztDQUFBLEFBalBELElBaVBDO0FBalBZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlY3VyZVN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNlY3VyZS1zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UsIE9yZGVyTW9kdWxlLCBPcmRlckRldGFpbHMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQYXl0bSxcclxuICAgIE9yZGVyLFxyXG4gICAgVHJhbnNhY3Rpb25DYWxsYmFjayxcclxuICAgIElPU0NhbGxiYWNrXHJcbn0gZnJvbSBcIkBuc3R1ZGlvL25hdGl2ZXNjcmlwdC1wYXl0bVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncGF5bWVudCcsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IGBwYXltZW50LmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BwYXltZW50LmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBQYXltZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZTtcclxuICAgIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICB0b3RhbF9pdGVtX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wYWNraW5nX3ByaWNlOiBudW1iZXI7XHJcbiAgICB0b3RhbF9wcmljZTogbnVtYmVyO1xyXG4gICAgYWxsX2NhcnRfZGF0YTogYW55O1xyXG4gICAgb3JkZXI6IE9yZGVyTW9kdWxlO1xyXG4gICAgcGF5dG1Gb3JtRGV0YWlsczogYW55O1xyXG4gICAgcGF5dG06IFBheXRtO1xyXG4gICAgb3JkZXJUb1BheXRtOiBPcmRlciA9IHtcclxuICAgICAgICBNSUQ6IFwiXCIsXHJcbiAgICAgICAgT1JERVJfSUQ6IFwiXCIsXHJcbiAgICAgICAgQ1VTVF9JRDogXCJcIixcclxuICAgICAgICBJTkRVU1RSWV9UWVBFX0lEOiBcIlwiLFxyXG4gICAgICAgIENIQU5ORUxfSUQ6IFwiXCIsXHJcbiAgICAgICAgVFhOX0FNT1VOVDogXCJcIixcclxuICAgICAgICBXRUJTSVRFOiBcIlwiLFxyXG4gICAgICAgIENBTExCQUNLX1VSTDogXCJcIixcclxuICAgICAgICBDSEVDS1NVTUhBU0g6IFwiXCJcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5vcmRlciA9IG5ldyBPcmRlck1vZHVsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgICAgIHRoaXMudXNlcl9pZCA9IGdldFN0cmluZygndXNlcl9pZCcpO1xyXG4gICAgICAgIHRoaXMucG9wdWxhdGVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wYXl0bSA9IG5ldyBQYXl0bSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAgICAgICAga2V5OiBcImNhcnRcIlxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gZmlsdGVyZWREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXREaXNjb3VudChwcmljZSwgZGlzY291bnRlZF9wcmljZSkge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmZsb29yKCgocHJpY2UgLSBkaXNjb3VudGVkX3ByaWNlKSAqIDEwMCkgLyBwcmljZSkgKyAnJSc7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gaW5jcmVtZW50KGkpIHtcclxuICAgIC8vICAgICB2YXIgcXR5ID0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHk7XHJcbiAgICAvLyAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHkgPSBxdHkgKyAxO1xyXG4gICAgLy8gICAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeCA9PiB4LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB4LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB4LnByb2R1Y3RfaWQgPT0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucHJvZHVjdF9pZCk7XHJcbiAgICAvLyAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuYWxsX2NhcnRfZGF0YVtpbmRleF0ucXVhbnRpdHkgPSBxdHkgKyAxO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNldENhcnREYXRhKClcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gZGVjcmVtZW50KGkpIHtcclxuICAgIC8vICAgICB2YXIgcXR5ID0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHk7XHJcbiAgICAvLyAgICAgaWYgKHF0eSA+IDEpIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHkgPSBxdHkgLSAxO1xyXG4gICAgLy8gICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeC5wcm9kdWN0X2lkID09IHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnByb2R1Y3RfaWQpO1xyXG4gICAgLy8gICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuYWxsX2NhcnRfZGF0YVtpbmRleF0ucXVhbnRpdHkgPSBxdHkgLSAxO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnByb2R1Y3RfaWQpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldFRvdGFsSXRlbVByaWNlKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgaWYgKHguZGlzY291bnRlZF9wcmljZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSArPSAoeC5kaXNjb3VudGVkX3ByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHgucHJpY2UgKiB4LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxQYWNraW5nUHJpY2UoKSB7XHJcbiAgICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlID0gMDtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2UgKz0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUoaWQpIHtcclxuICAgIC8vICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeC5wcm9kdWN0X2lkID09IGlkKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhpbmRleClcclxuICAgIC8vICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2V0Q2FydERhdGEoKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRDYXJ0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLnNlY3VyZVN0b3JhZ2Uuc2V0KHtcclxuICAgICAgICAgICAga2V5OiAnY2FydCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh0aGlzLmFsbF9jYXJ0X2RhdGEpXHJcbiAgICAgICAgfSkudGhlbihzdWNjZXNzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VjY2VzcylcclxuICAgICAgICAgICAgdGhpcy5nZXRUb3RhbEl0ZW1QcmljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9yZGVyUGxhY2UoKSB7XHJcbiAgICAgICAgdGhpcy5vcmRlci5jdXN0b21lciA9IHRoaXMudXNlcl9pZDtcclxuICAgICAgICB0aGlzLm9yZGVyLnByaWNlID0gdGhpcy50b3RhbF9pdGVtX3ByaWNlICsgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlO1xyXG4gICAgICAgIHRoaXMub3JkZXIuYXBwbWFzdGVyID0gdGhpcy5hcHBfaWRcclxuICAgICAgICB2YXIgZGV0YWlsc19kYXRhID0gbmV3IE9yZGVyRGV0YWlscygpO1xyXG4gICAgICAgIHZhciBhbGxfZGV0YWlsc19kYXRhID0gW11cclxuICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICBkZXRhaWxzX2RhdGEuYXBwbWFzdGVyID0geC5hcHBfaWQ7XHJcbiAgICAgICAgICAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzX2RhdGEudW5pdF9wcmljZSA9IHguZGlzY291bnRlZF9wcmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRldGFpbHNfZGF0YS51bml0X3ByaWNlID0geC5wcmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZXRhaWxzX2RhdGEucXVhbnRpdHkgPSB4LnF1YW50aXR5O1xyXG4gICAgICAgICAgICBkZXRhaWxzX2RhdGEucHJvZHVjdCA9IHgucHJvZHVjdF9pZDtcclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLnBhY2thZ2luZ19jb3N0ID0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICAgICAgICAgIGRldGFpbHNfZGF0YS51b20gPSBcIjBcIjtcclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLklHU1QgPSBcIjBcIjtcclxuICAgICAgICAgICAgZGV0YWlsc19kYXRhLkNHU1QgPSBcIjBcIjtcclxuICAgICAgICAgICAgYWxsX2RldGFpbHNfZGF0YS5wdXNoKGRldGFpbHNfZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeSA9PiB5LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB5LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB5LnByb2R1Y3RfaWQgPT0geC5wcm9kdWN0X2lkKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5vcmRlci5vcmRlcl9kZXRhaWxzID0gYWxsX2RldGFpbHNfZGF0YTtcclxuICAgICAgICAvLyB0aGlzLnNldENhcnREYXRhKCk7XHJcbiAgICAgICAgLy8gdGhpcy5zdG9yZUFwcFNlcnZpY2UuY3JlYXRlT3JkZXIodGhpcy5vcmRlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgIC8vICAgICByZXMgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RvcmUtYXBwLycsIHRoaXMuYXBwX2lkLCAncGF5bWVudCddKVxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIClcclxuICAgICAgICAvLyB0aGlzLmdldFBheXRtRm9ybVZhbHVlKHRoaXMub3JkZXIucHJpY2UpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGdldFBheXRtRm9ybVZhbHVlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UucGF5dG1Gb3JtVmFsdWUoYW1vdW50KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheXRtRm9ybURldGFpbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBheVZpYVBheXRtKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHBheXRtXHJcbiAgICBwYXlWaWFQYXl0bSgpIHtcclxuICAgICAgICB0aGlzLnBheXRtLnNldElPU0NhbGxiYWNrcyh7XHJcbiAgICAgICAgICAgIGRpZEZpbmlzaGVkUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvblwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNaXNzaW5nUGFyYW1ldGVyRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcmRlclRvUGF5dG0gPSB7XHJcbiAgICAgICAgICAgIE1JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydNSUQnXSxcclxuICAgICAgICAgICAgT1JERVJfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snT1JERVJfSUQnXSxcclxuICAgICAgICAgICAgQ1VTVF9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDVVNUX0lEJ10sXHJcbiAgICAgICAgICAgIElORFVTVFJZX1RZUEVfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snSU5EVVNUUllfVFlQRV9JRCddLFxyXG4gICAgICAgICAgICBDSEFOTkVMX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NIQU5ORUxfSUQnXSxcclxuICAgICAgICAgICAgVFhOX0FNT1VOVDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydUWE5fQU1PVU5UJ10sXHJcbiAgICAgICAgICAgIFdFQlNJVEU6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snV0VCU0lURSddLFxyXG4gICAgICAgICAgICBDQUxMQkFDS19VUkw6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0FMTEJBQ0tfVVJMJ10sXHJcbiAgICAgICAgICAgIENIRUNLU1VNSEFTSDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDSEVDS1NVTUhBU0gnXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wYXl0bS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyVG9QYXl0bSk7XHJcbiAgICAgICAgdGhpcy5wYXl0bS5pbml0aWFsaXplKFwiU1RBR0lOR1wiKTtcclxuICAgICAgICB0aGlzLnBheXRtLnN0YXJ0UGF5bWVudFRyYW5zYWN0aW9uKHtcclxuICAgICAgICAgICAgc29tZVVJRXJyb3JPY2N1cnJlZDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVHJhbnNhY3Rpb25SZXNwb25zZTogZnVuY3Rpb24gKGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXR3b3JrTm90QXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5ldHdvcmsgbm90IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpZW50QXV0aGVudGljYXRpb25GYWlsZWQ6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVycm9yTG9hZGluZ1dlYlBhZ2U6IGZ1bmN0aW9uIChcclxuICAgICAgICAgICAgICAgIGluaUVycm9yQ29kZSxcclxuICAgICAgICAgICAgICAgIGluRXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgaW5GYWlsaW5nVXJsXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5pRXJyb3JDb2RlLCBpbkVycm9yTWVzc2FnZSwgaW5GYWlsaW5nVXJsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25CYWNrUHJlc3NlZENhbmNlbFRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgY2FuY2VsbGVkIHRyYW5zYWN0aW9uIGJ5IHByZXNzaW5nIGJhY2sgYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zYWN0aW9uQ2FuY2VsOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UsIGluUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19