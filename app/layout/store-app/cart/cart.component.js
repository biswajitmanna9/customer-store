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
var StoreAppCartComponent = /** @class */ (function () {
    function StoreAppCartComponent(route, location, storeAppService, router) {
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
    StoreAppCartComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.populateData();
        this.paytm = new nativescript_paytm_1.Paytm();
    };
    StoreAppCartComponent.prototype.populateData = function () {
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
    StoreAppCartComponent.prototype.getDiscount = function (price, discounted_price) {
        return Math.floor(((price - discounted_price) * 100) / price) + '%';
    };
    StoreAppCartComponent.prototype.increment = function (i) {
        var _this = this;
        var qty = this.customer_cart_data[i].quantity;
        this.customer_cart_data[i].quantity = qty + 1;
        var index = this.all_cart_data.findIndex(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id && x.product_id == _this.customer_cart_data[i].product_id; });
        if (index != -1) {
            this.all_cart_data[index].quantity = qty + 1;
            this.setCartData();
        }
    };
    StoreAppCartComponent.prototype.decrement = function (i) {
        var _this = this;
        var qty = this.customer_cart_data[i].quantity;
        if (qty > 1) {
            this.customer_cart_data[i].quantity = qty - 1;
            var index = this.all_cart_data.findIndex(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id && x.product_id == _this.customer_cart_data[i].product_id; });
            if (index != -1) {
                this.all_cart_data[index].quantity = qty - 1;
                this.setCartData();
            }
        }
        else {
            this.remove(this.customer_cart_data[i].product_id);
        }
    };
    StoreAppCartComponent.prototype.getTotalItemPrice = function () {
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
    StoreAppCartComponent.prototype.getTotalPackingPrice = function () {
        var _this = this;
        this.total_packing_price = 0;
        this.customer_cart_data.forEach(function (x) {
            _this.total_packing_price += x.packing_charges;
        });
    };
    StoreAppCartComponent.prototype.remove = function (id) {
        var _this = this;
        var index = this.all_cart_data.findIndex(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id && x.product_id == id; });
        console.log(index);
        if (index != -1) {
            this.all_cart_data.splice(index, 1);
            this.customer_cart_data.splice(index, 1);
            this.setCartData();
        }
    };
    StoreAppCartComponent.prototype.setCartData = function () {
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
    StoreAppCartComponent.prototype.orderPlace = function () {
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
        this.router.navigate(['/store-app/', this.app_id, 'payment']);
        // this.getPaytmFormValue(this.order.price)
    };
    StoreAppCartComponent = __decorate([
        core_1.Component({
            selector: "cart",
            moduleId: module.id,
            templateUrl: "./cart.component.html",
            styleUrls: ['./cart.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService,
            router_2.Router])
    ], StoreAppCartComponent);
    return StoreAppCartComponent;
}());
exports.StoreAppCartComponent = StoreAppCartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQXNHO0FBQ3RHLDBDQUF5QztBQUN6QyxrRUFLcUM7QUFPckM7SUF3QkUsK0JBQ1UsS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmeEIsaUJBQVksR0FBVTtZQUNwQixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFPQSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkNBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSwrQkFBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENBQUMsU0FB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QWU7WUFDeEIsZUFBTTtPQTVCYixxQkFBcUIsQ0FrUGpDO0lBQUQsNEJBQUM7Q0FBQSxBQWxQRCxJQWtQQztBQWxQWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtcclxuICBQYXl0bSxcclxuICBPcmRlcixcclxuICBUcmFuc2FjdGlvbkNhbGxiYWNrLFxyXG4gIElPU0NhbGxiYWNrXHJcbn0gZnJvbSBcIkBuc3R1ZGlvL25hdGl2ZXNjcmlwdC1wYXl0bVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJjYXJ0XCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2NhcnQuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9jYXJ0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBDYXJ0Q29tcG9uZW50IHtcclxuICBhcHBfaWQ6IHN0cmluZztcclxuICBzZWN1cmVTdG9yYWdlOiBTZWN1cmVTdG9yYWdlO1xyXG4gIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gIHVzZXJfaWQ6IHN0cmluZztcclxuICB2aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICB0b3RhbF9pdGVtX3ByaWNlOiBudW1iZXI7XHJcbiAgdG90YWxfcGFja2luZ19wcmljZTogbnVtYmVyO1xyXG4gIHRvdGFsX3ByaWNlOiBudW1iZXI7XHJcbiAgYWxsX2NhcnRfZGF0YTogYW55O1xyXG4gIG9yZGVyOiBPcmRlck1vZHVsZTtcclxuICBwYXl0bUZvcm1EZXRhaWxzOiBhbnk7XHJcbiAgcGF5dG06IFBheXRtO1xyXG4gIG9yZGVyVG9QYXl0bTogT3JkZXIgPSB7XHJcbiAgICBNSUQ6IFwiXCIsXHJcbiAgICBPUkRFUl9JRDogXCJcIixcclxuICAgIENVU1RfSUQ6IFwiXCIsXHJcbiAgICBJTkRVU1RSWV9UWVBFX0lEOiBcIlwiLFxyXG4gICAgQ0hBTk5FTF9JRDogXCJcIixcclxuICAgIFRYTl9BTU9VTlQ6IFwiXCIsXHJcbiAgICBXRUJTSVRFOiBcIlwiLFxyXG4gICAgQ0FMTEJBQ0tfVVJMOiBcIlwiLFxyXG4gICAgQ0hFQ0tTVU1IQVNIOiBcIlwiXHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5zZWN1cmVTdG9yYWdlID0gbmV3IFNlY3VyZVN0b3JhZ2UoKTtcclxuICAgIHRoaXMub3JkZXIgPSBuZXcgT3JkZXJNb2R1bGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdmFyIGZ1bGxfbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xyXG4gICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgIHRoaXMudXNlcl9pZCA9IGdldFN0cmluZygndXNlcl9pZCcpO1xyXG4gICAgdGhpcy5wb3B1bGF0ZURhdGEoKTtcclxuICAgIHRoaXMucGF5dG0gPSBuZXcgUGF5dG0oKTtcclxuICB9XHJcblxyXG4gIHBvcHVsYXRlRGF0YSgpIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5nZXQoe1xyXG4gICAgICBrZXk6IFwiY2FydFwiXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICB2YWx1ZSA9PiB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgdmFyIGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQpXHJcbiAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IGZpbHRlcmVkRGF0YTtcclxuICAgICAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0VG90YWxQYWNraW5nUHJpY2UoKTtcclxuICAgICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzY291bnQocHJpY2UsIGRpc2NvdW50ZWRfcHJpY2UpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKCgocHJpY2UgLSBkaXNjb3VudGVkX3ByaWNlKSAqIDEwMCkgLyBwcmljZSkgKyAnJSc7XHJcbiAgfVxyXG5cclxuICBpbmNyZW1lbnQoaSkge1xyXG4gICAgdmFyIHF0eSA9IHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5O1xyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHkgPSBxdHkgKyAxO1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHgucHJvZHVjdF9pZCA9PSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5wcm9kdWN0X2lkKTtcclxuICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmFsbF9jYXJ0X2RhdGFbaW5kZXhdLnF1YW50aXR5ID0gcXR5ICsgMTtcclxuICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWNyZW1lbnQoaSkge1xyXG4gICAgdmFyIHF0eSA9IHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5O1xyXG4gICAgaWYgKHF0eSA+IDEpIHtcclxuICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucXVhbnRpdHkgPSBxdHkgLSAxO1xyXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeC5wcm9kdWN0X2lkID09IHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnByb2R1Y3RfaWQpO1xyXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICB0aGlzLmFsbF9jYXJ0X2RhdGFbaW5kZXhdLnF1YW50aXR5ID0gcXR5IC0gMTtcclxuICAgICAgICB0aGlzLnNldENhcnREYXRhKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlKHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnByb2R1Y3RfaWQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUb3RhbEl0ZW1QcmljZSgpIHtcclxuICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSA9IDA7XHJcbiAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICBpZiAoeC5kaXNjb3VudGVkX3ByaWNlID4gMCkge1xyXG4gICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSArPSAoeC5kaXNjb3VudGVkX3ByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy50b3RhbF9pdGVtX3ByaWNlICs9ICh4LnByaWNlICogeC5xdWFudGl0eSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBnZXRUb3RhbFBhY2tpbmdQcmljZSgpIHtcclxuICAgIHRoaXMudG90YWxfcGFja2luZ19wcmljZSA9IDA7XHJcbiAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2UgKz0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFsbF9jYXJ0X2RhdGEuZmluZEluZGV4KHggPT4geC5jdXN0b21lcl9pZCA9PSB0aGlzLnVzZXJfaWQgJiYgeC5hcHBfaWQgPT0gdGhpcy5hcHBfaWQgJiYgeC5wcm9kdWN0X2lkID09IGlkKTtcclxuICAgIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgIHRoaXMuYWxsX2NhcnRfZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB0aGlzLnNldENhcnREYXRhKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldENhcnREYXRhKCkge1xyXG4gICAgdGhpcy5zZWN1cmVTdG9yYWdlLnNldCh7XHJcbiAgICAgIGtleTogJ2NhcnQnLFxyXG4gICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodGhpcy5hbGxfY2FydF9kYXRhKVxyXG4gICAgfSkudGhlbihzdWNjZXNzID0+IHtcclxuICAgICAgY29uc29sZS5sb2coc3VjY2VzcylcclxuICAgICAgdGhpcy5nZXRUb3RhbEl0ZW1QcmljZSgpO1xyXG4gICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBvcmRlclBsYWNlKCkge1xyXG4gICAgLy8gdGhpcy5vcmRlci5jdXN0b21lciA9IHRoaXMudXNlcl9pZDtcclxuICAgIC8vIHRoaXMub3JkZXIucHJpY2UgPSB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKyB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2U7XHJcbiAgICAvLyB0aGlzLm9yZGVyLmFwcG1hc3RlciA9IHRoaXMuYXBwX2lkXHJcbiAgICAvLyB2YXIgZGV0YWlsc19kYXRhID0gbmV3IE9yZGVyRGV0YWlscygpO1xyXG4gICAgLy8gdmFyIGFsbF9kZXRhaWxzX2RhdGEgPSBbXVxyXG4gICAgLy8gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgIC8vICAgZGV0YWlsc19kYXRhLmFwcG1hc3RlciA9IHguYXBwX2lkO1xyXG4gICAgLy8gICBpZiAoeC5kaXNjb3VudGVkX3ByaWNlID4gMCkge1xyXG4gICAgLy8gICAgIGRldGFpbHNfZGF0YS51bml0X3ByaWNlID0geC5kaXNjb3VudGVkX3ByaWNlO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGVsc2Uge1xyXG4gICAgLy8gICAgIGRldGFpbHNfZGF0YS51bml0X3ByaWNlID0geC5wcmljZTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEucXVhbnRpdHkgPSB4LnF1YW50aXR5O1xyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEucHJvZHVjdCA9IHgucHJvZHVjdF9pZDtcclxuICAgIC8vICAgZGV0YWlsc19kYXRhLnBhY2thZ2luZ19jb3N0ID0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICAvLyAgIGRldGFpbHNfZGF0YS51b20gPSBcIjBcIjtcclxuICAgIC8vICAgZGV0YWlsc19kYXRhLklHU1QgPSBcIjBcIjtcclxuICAgIC8vICAgZGV0YWlsc19kYXRhLkNHU1QgPSBcIjBcIjtcclxuICAgIC8vICAgYWxsX2RldGFpbHNfZGF0YS5wdXNoKGRldGFpbHNfZGF0YSk7XHJcbiAgICAvLyAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeSA9PiB5LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB5LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB5LnByb2R1Y3RfaWQgPT0geC5wcm9kdWN0X2lkKTtcclxuICAgIC8vICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAvLyAgICAgdGhpcy5hbGxfY2FydF9kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgICAvLyB0aGlzLm9yZGVyLm9yZGVyX2RldGFpbHMgPSBhbGxfZGV0YWlsc19kYXRhO1xyXG4gICAgLy8gdGhpcy5zZXRDYXJ0RGF0YSgpO1xyXG4gICAgLy8gdGhpcy5zdG9yZUFwcFNlcnZpY2UuY3JlYXRlT3JkZXIodGhpcy5vcmRlcikuc3Vic2NyaWJlKFxyXG4gICAgLy8gICByZXMgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgIC8vICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJywgdGhpcy5hcHBfaWQsICdwYXltZW50J10pXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIGVycm9yID0+IHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIC8vICAgfVxyXG4gICAgLy8gKVxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RvcmUtYXBwLycsIHRoaXMuYXBwX2lkLCAncGF5bWVudCddKVxyXG4gICAgLy8gdGhpcy5nZXRQYXl0bUZvcm1WYWx1ZSh0aGlzLm9yZGVyLnByaWNlKVxyXG4gIH0gIFxyXG5cclxuICAvLyBnZXRQYXl0bUZvcm1WYWx1ZShhbW91bnQ6IG51bWJlcikge1xyXG4gIC8vICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UucGF5dG1Gb3JtVmFsdWUoYW1vdW50KS5zdWJzY3JpYmUoXHJcbiAgLy8gICAgIHJlcyA9PiB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gIC8vICAgICAgIHRoaXMucGF5dG1Gb3JtRGV0YWlscyA9IHJlcztcclxuICAvLyAgICAgICB0aGlzLnBheVZpYVBheXRtKCk7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGVycm9yID0+IHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAvLyAgICAgfVxyXG4gIC8vICAgKVxyXG4gIC8vIH1cclxuXHJcbiAgLy8gLy8gcGF5dG1cclxuICAvLyBwYXlWaWFQYXl0bSgpIHtcclxuICAvLyAgIHRoaXMucGF5dG0uc2V0SU9TQ2FsbGJhY2tzKHtcclxuICAvLyAgICAgZGlkRmluaXNoZWRSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBkaWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBjYW5jZWxsZWQgdHJhbnNhY3Rpb25cIik7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGVycm9yTWlzc2luZ1BhcmFtZXRlckVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0pO1xyXG4gIC8vICAgdGhpcy5vcmRlclRvUGF5dG0gPSB7XHJcbiAgLy8gICAgIE1JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydNSUQnXSxcclxuICAvLyAgICAgT1JERVJfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snT1JERVJfSUQnXSxcclxuICAvLyAgICAgQ1VTVF9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDVVNUX0lEJ10sXHJcbiAgLy8gICAgIElORFVTVFJZX1RZUEVfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snSU5EVVNUUllfVFlQRV9JRCddLFxyXG4gIC8vICAgICBDSEFOTkVMX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NIQU5ORUxfSUQnXSxcclxuICAvLyAgICAgVFhOX0FNT1VOVDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydUWE5fQU1PVU5UJ10sXHJcbiAgLy8gICAgIFdFQlNJVEU6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snV0VCU0lURSddLFxyXG4gIC8vICAgICBDQUxMQkFDS19VUkw6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0FMTEJBQ0tfVVJMJ10sXHJcbiAgLy8gICAgIENIRUNLU1VNSEFTSDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDSEVDS1NVTUhBU0gnXVxyXG4gIC8vICAgfTtcclxuICAvLyAgIHRoaXMucGF5dG0uY3JlYXRlT3JkZXIodGhpcy5vcmRlclRvUGF5dG0pO1xyXG4gIC8vICAgdGhpcy5wYXl0bS5pbml0aWFsaXplKFwiU1RBR0lOR1wiKTtcclxuICAvLyAgIHRoaXMucGF5dG0uc3RhcnRQYXltZW50VHJhbnNhY3Rpb24oe1xyXG4gIC8vICAgICBzb21lVUlFcnJvck9jY3VycmVkOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UpIHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSk7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIG9uVHJhbnNhY3Rpb25SZXNwb25zZTogZnVuY3Rpb24gKGluUmVzcG9uc2UpIHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhpblJlc3BvbnNlKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgbmV0d29ya05vdEF2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKFwiTmV0d29yayBub3QgYXZhaWxhYmxlXCIpO1xyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBjbGllbnRBdXRoZW50aWNhdGlvbkZhaWxlZDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UpO1xyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBvbkVycm9yTG9hZGluZ1dlYlBhZ2U6IGZ1bmN0aW9uIChcclxuICAvLyAgICAgICBpbmlFcnJvckNvZGUsXHJcbiAgLy8gICAgICAgaW5FcnJvck1lc3NhZ2UsXHJcbiAgLy8gICAgICAgaW5GYWlsaW5nVXJsXHJcbiAgLy8gICAgICkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGluaUVycm9yQ29kZSwgaW5FcnJvck1lc3NhZ2UsIGluRmFpbGluZ1VybCk7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIG9uQmFja1ByZXNzZWRDYW5jZWxUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBjYW5jZWxsZWQgdHJhbnNhY3Rpb24gYnkgcHJlc3NpbmcgYmFjayBidXR0b25cIik7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIG9uVHJhbnNhY3Rpb25DYW5jZWw6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSwgaW5SZXNwb25zZSkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG59Il19