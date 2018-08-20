"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("@angular/router");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
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
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        this.lodaing_options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: false,
                cancelListener: function (dialog) { console.log("Loading cancelled"); },
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
            ios: {
                details: "Additional detail note!",
                margin: 10,
                dimBackground: true,
                color: "#4B9ED6",
                backgroundColor: "yellow",
                userInteractionEnabled: false,
                hideBezel: true,
            }
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
    StoreAppCartComponent.prototype.shop = function () {
        this.router.navigate(['/store-app/' + this.app_id + '/products']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQXNHO0FBQ3RHLDBDQUF5QztBQUN6QyxpRkFBa0U7QUFDbEUsa0VBS3FDO0FBT3JDO0lBZ0RFLCtCQUNVLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQWM7UUFIZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBdkN4QixpQkFBWSxHQUFVO1lBQ3BCLEdBQUcsRUFBRSxFQUFFO1lBQ1AsUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsVUFBVSxFQUFFLEVBQUU7WUFDZCxVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7U0FDakIsQ0FBQztRQUNGLFdBQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7UUFDbEMsb0JBQWUsR0FBRztZQUNsQixPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGNBQWMsRUFBRSxVQUFVLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUN0RSxHQUFHLEVBQUUsR0FBRztnQkFDUixvQkFBb0IsRUFBRSxTQUFTO2dCQUMvQixxQkFBcUIs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NEI7UUFDNUIseUNBQXlDO1FBQ3pDLHVDQUF1QztRQUN2QyxrQ0FBa0M7UUFDbEMsb0RBQW9EO1FBQ3BELE1BQU07UUFDTixXQUFXO1FBQ1gseUNBQXlDO1FBQ3pDLE1BQU07UUFDTix3Q0FBd0M7UUFDeEMseUNBQXlDO1FBQ3pDLHFEQUFxRDtRQUNyRCw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3Qix5Q0FBeUM7UUFDekMsNklBQTZJO1FBQzdJLHVCQUF1QjtRQUN2QiwyQ0FBMkM7UUFDM0MsTUFBTTtRQUNOLEtBQUs7UUFDTCwrQ0FBK0M7UUFDL0Msc0JBQXNCO1FBQ3RCLDBEQUEwRDtRQUMxRCxhQUFhO1FBQ2IsdUJBQXVCO1FBQ3ZCLG9FQUFvRTtRQUNwRSxPQUFPO1FBQ1AsZUFBZTtRQUNmLHlCQUF5QjtRQUN6QixNQUFNO1FBQ04sSUFBSTtRQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUM3RCwyQ0FBMkM7SUFDN0MsQ0FBQztJQXpNVSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3BDLENBQUM7eUNBa0RpQix1QkFBYztZQUNYLGlCQUFRO1lBQ0QsbUNBQWU7WUFDeEIsZUFBTTtPQXBEYixxQkFBcUIsQ0E4UWpDO0lBQUQsNEJBQUM7Q0FBQSxBQTlRRCxJQThRQztBQTlRWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuaW1wb3J0IHtcclxuICBQYXl0bSxcclxuICBPcmRlcixcclxuICBUcmFuc2FjdGlvbkNhbGxiYWNrLFxyXG4gIElPU0NhbGxiYWNrXHJcbn0gZnJvbSBcIkBuc3R1ZGlvL25hdGl2ZXNjcmlwdC1wYXl0bVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJjYXJ0XCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2NhcnQuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9jYXJ0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBDYXJ0Q29tcG9uZW50IHtcclxuICBhcHBfaWQ6IHN0cmluZztcclxuICBzZWN1cmVTdG9yYWdlOiBTZWN1cmVTdG9yYWdlO1xyXG4gIGN1c3RvbWVyX2NhcnRfZGF0YTogYW55O1xyXG4gIHVzZXJfaWQ6IHN0cmluZztcclxuICB2aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICB0b3RhbF9pdGVtX3ByaWNlOiBudW1iZXI7XHJcbiAgdG90YWxfcGFja2luZ19wcmljZTogbnVtYmVyO1xyXG4gIHRvdGFsX3ByaWNlOiBudW1iZXI7XHJcbiAgYWxsX2NhcnRfZGF0YTogYW55O1xyXG4gIG9yZGVyOiBPcmRlck1vZHVsZTtcclxuICBwYXl0bUZvcm1EZXRhaWxzOiBhbnk7XHJcbiAgcGF5dG06IFBheXRtO1xyXG4gIG9yZGVyVG9QYXl0bTogT3JkZXIgPSB7XHJcbiAgICBNSUQ6IFwiXCIsXHJcbiAgICBPUkRFUl9JRDogXCJcIixcclxuICAgIENVU1RfSUQ6IFwiXCIsXHJcbiAgICBJTkRVU1RSWV9UWVBFX0lEOiBcIlwiLFxyXG4gICAgQ0hBTk5FTF9JRDogXCJcIixcclxuICAgIFRYTl9BTU9VTlQ6IFwiXCIsXHJcbiAgICBXRUJTSVRFOiBcIlwiLFxyXG4gICAgQ0FMTEJBQ0tfVVJMOiBcIlwiLFxyXG4gICAgQ0hFQ0tTVU1IQVNIOiBcIlwiXHJcbiAgfTtcclxuICBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5sb2RhaW5nX29wdGlvbnMgPSB7XHJcbm1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxucHJvZ3Jlc3M6IDAuNjUsXHJcbmFuZHJvaWQ6IHtcclxuICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbiAoZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICBtYXg6IDEwMCxcclxuICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxufSxcclxuaW9zOiB7XHJcbiAgZGV0YWlsczogXCJBZGRpdGlvbmFsIGRldGFpbCBub3RlIVwiLFxyXG4gIG1hcmdpbjogMTAsXHJcbiAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICBjb2xvcjogXCIjNEI5RUQ2XCIsXHJcbiAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLFxyXG4gIGhpZGVCZXplbDogdHJ1ZSxcclxufVxyXG59XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XHJcbiAgICB0aGlzLm9yZGVyID0gbmV3IE9yZGVyTW9kdWxlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIHRoaXMucG9wdWxhdGVEYXRhKCk7XHJcbiAgICB0aGlzLnBheXRtID0gbmV3IFBheXRtKCk7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZURhdGEoKSB7XHJcbiAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAga2V5OiBcImNhcnRcIlxyXG4gICAgfSkudGhlbihcclxuICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgIHZhciBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkKVxyXG4gICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEgPSBmaWx0ZXJlZERhdGE7XHJcbiAgICAgICAgICB0aGlzLmdldFRvdGFsSXRlbVByaWNlKCk7XHJcbiAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldERpc2NvdW50KHByaWNlLCBkaXNjb3VudGVkX3ByaWNlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKHByaWNlIC0gZGlzY291bnRlZF9wcmljZSkgKiAxMDApIC8gcHJpY2UpICsgJyUnO1xyXG4gIH1cclxuXHJcbiAgaW5jcmVtZW50KGkpIHtcclxuICAgIHZhciBxdHkgPSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5xdWFudGl0eTtcclxuICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5ID0gcXR5ICsgMTtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeCA9PiB4LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB4LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB4LnByb2R1Y3RfaWQgPT0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucHJvZHVjdF9pZCk7XHJcbiAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgdGhpcy5hbGxfY2FydF9kYXRhW2luZGV4XS5xdWFudGl0eSA9IHF0eSArIDE7XHJcbiAgICAgIHRoaXMuc2V0Q2FydERhdGEoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVjcmVtZW50KGkpIHtcclxuICAgIHZhciBxdHkgPSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5xdWFudGl0eTtcclxuICAgIGlmIChxdHkgPiAxKSB7XHJcbiAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5ID0gcXR5IC0gMTtcclxuICAgICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHgucHJvZHVjdF9pZCA9PSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5wcm9kdWN0X2lkKTtcclxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhW2luZGV4XS5xdWFudGl0eSA9IHF0eSAtIDE7XHJcbiAgICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5wcm9kdWN0X2lkKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VG90YWxJdGVtUHJpY2UoKSB7XHJcbiAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgPSAwO1xyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgaWYgKHguZGlzY291bnRlZF9wcmljZSA+IDApIHtcclxuICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHguZGlzY291bnRlZF9wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSArPSAoeC5wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZ2V0VG90YWxQYWNraW5nUHJpY2UoKSB7XHJcbiAgICB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2UgPSAwO1xyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlICs9IHgucGFja2luZ19jaGFyZ2VzO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlbW92ZShpZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHgucHJvZHVjdF9pZCA9PSBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhpbmRleClcclxuICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRDYXJ0RGF0YSgpIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xyXG4gICAgICBrZXk6ICdjYXJ0JyxcclxuICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsX2NhcnRfZGF0YSlcclxuICAgIH0pLnRoZW4oc3VjY2VzcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN1Y2Nlc3MpXHJcbiAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgdGhpcy5nZXRUb3RhbFBhY2tpbmdQcmljZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaG9wKClcclxuICB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJyArIHRoaXMuYXBwX2lkKycvcHJvZHVjdHMnXSlcclxuICB9XHJcblxyXG4gIG9yZGVyUGxhY2UoKSB7XHJcbiAgICAvLyB0aGlzLm9yZGVyLmN1c3RvbWVyID0gdGhpcy51c2VyX2lkO1xyXG4gICAgLy8gdGhpcy5vcmRlci5wcmljZSA9IHRoaXMudG90YWxfaXRlbV9wcmljZSArIHRoaXMudG90YWxfcGFja2luZ19wcmljZTtcclxuICAgIC8vIHRoaXMub3JkZXIuYXBwbWFzdGVyID0gdGhpcy5hcHBfaWRcclxuICAgIC8vIHZhciBkZXRhaWxzX2RhdGEgPSBuZXcgT3JkZXJEZXRhaWxzKCk7XHJcbiAgICAvLyB2YXIgYWxsX2RldGFpbHNfZGF0YSA9IFtdXHJcbiAgICAvLyB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YS5mb3JFYWNoKHggPT4ge1xyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEuYXBwbWFzdGVyID0geC5hcHBfaWQ7XHJcbiAgICAvLyAgIGlmICh4LmRpc2NvdW50ZWRfcHJpY2UgPiAwKSB7XHJcbiAgICAvLyAgICAgZGV0YWlsc19kYXRhLnVuaXRfcHJpY2UgPSB4LmRpc2NvdW50ZWRfcHJpY2U7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgZWxzZSB7XHJcbiAgICAvLyAgICAgZGV0YWlsc19kYXRhLnVuaXRfcHJpY2UgPSB4LnByaWNlO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGRldGFpbHNfZGF0YS5xdWFudGl0eSA9IHgucXVhbnRpdHk7XHJcbiAgICAvLyAgIGRldGFpbHNfZGF0YS5wcm9kdWN0ID0geC5wcm9kdWN0X2lkO1xyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEucGFja2FnaW5nX2Nvc3QgPSB4LnBhY2tpbmdfY2hhcmdlcztcclxuICAgIC8vICAgZGV0YWlsc19kYXRhLnVvbSA9IFwiMFwiO1xyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEuSUdTVCA9IFwiMFwiO1xyXG4gICAgLy8gICBkZXRhaWxzX2RhdGEuQ0dTVCA9IFwiMFwiO1xyXG4gICAgLy8gICBhbGxfZGV0YWlsc19kYXRhLnB1c2goZGV0YWlsc19kYXRhKTtcclxuICAgIC8vICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh5ID0+IHkuY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHkuYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHkucHJvZHVjdF9pZCA9PSB4LnByb2R1Y3RfaWQpO1xyXG4gICAgLy8gICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgIC8vICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICAgIC8vIHRoaXMub3JkZXIub3JkZXJfZGV0YWlscyA9IGFsbF9kZXRhaWxzX2RhdGE7XHJcbiAgICAvLyB0aGlzLnNldENhcnREYXRhKCk7XHJcbiAgICAvLyB0aGlzLnN0b3JlQXBwU2VydmljZS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyKS5zdWJzY3JpYmUoXHJcbiAgICAvLyAgIHJlcyA9PiB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgLy8gICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0b3JlLWFwcC8nLCB0aGlzLmFwcF9pZCwgJ3BheW1lbnQnXSlcclxuICAgIC8vICAgfSxcclxuICAgIC8vICAgZXJyb3IgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyApXHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJywgdGhpcy5hcHBfaWQsICdwYXltZW50J10pXHJcbiAgICAvLyB0aGlzLmdldFBheXRtRm9ybVZhbHVlKHRoaXMub3JkZXIucHJpY2UpXHJcbiAgfSAgXHJcblxyXG4gIC8vIGdldFBheXRtRm9ybVZhbHVlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgLy8gICB0aGlzLnN0b3JlQXBwU2VydmljZS5wYXl0bUZvcm1WYWx1ZShhbW91bnQpLnN1YnNjcmliZShcclxuICAvLyAgICAgcmVzID0+IHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgLy8gICAgICAgdGhpcy5wYXl0bUZvcm1EZXRhaWxzID0gcmVzO1xyXG4gIC8vICAgICAgIHRoaXMucGF5VmlhUGF5dG0oKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgZXJyb3IgPT4ge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICApXHJcbiAgLy8gfVxyXG5cclxuICAvLyAvLyBwYXl0bVxyXG4gIC8vIHBheVZpYVBheXRtKCkge1xyXG4gIC8vICAgdGhpcy5wYXl0bS5zZXRJT1NDYWxsYmFja3Moe1xyXG4gIC8vICAgICBkaWRGaW5pc2hlZFJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGRpZENhbmNlbFRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvblwiKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgZXJyb3JNaXNzaW5nUGFyYW1ldGVyRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSk7XHJcbiAgLy8gICB0aGlzLm9yZGVyVG9QYXl0bSA9IHtcclxuICAvLyAgICAgTUlEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ01JRCddLFxyXG4gIC8vICAgICBPUkRFUl9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydPUkRFUl9JRCddLFxyXG4gIC8vICAgICBDVVNUX0lEOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NVU1RfSUQnXSxcclxuICAvLyAgICAgSU5EVVNUUllfVFlQRV9JRDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydJTkRVU1RSWV9UWVBFX0lEJ10sXHJcbiAgLy8gICAgIENIQU5ORUxfSUQ6IHRoaXMucGF5dG1Gb3JtRGV0YWlsc1snQ0hBTk5FTF9JRCddLFxyXG4gIC8vICAgICBUWE5fQU1PVU5UOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ1RYTl9BTU9VTlQnXSxcclxuICAvLyAgICAgV0VCU0lURTogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydXRUJTSVRFJ10sXHJcbiAgLy8gICAgIENBTExCQUNLX1VSTDogdGhpcy5wYXl0bUZvcm1EZXRhaWxzWydDQUxMQkFDS19VUkwnXSxcclxuICAvLyAgICAgQ0hFQ0tTVU1IQVNIOiB0aGlzLnBheXRtRm9ybURldGFpbHNbJ0NIRUNLU1VNSEFTSCddXHJcbiAgLy8gICB9O1xyXG4gIC8vICAgdGhpcy5wYXl0bS5jcmVhdGVPcmRlcih0aGlzLm9yZGVyVG9QYXl0bSk7XHJcbiAgLy8gICB0aGlzLnBheXRtLmluaXRpYWxpemUoXCJTVEFHSU5HXCIpO1xyXG4gIC8vICAgdGhpcy5wYXl0bS5zdGFydFBheW1lbnRUcmFuc2FjdGlvbih7XHJcbiAgLy8gICAgIHNvbWVVSUVycm9yT2NjdXJyZWQ6IGZ1bmN0aW9uIChpbkVycm9yTWVzc2FnZSkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGluRXJyb3JNZXNzYWdlKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgb25UcmFuc2FjdGlvblJlc3BvbnNlOiBmdW5jdGlvbiAoaW5SZXNwb25zZSkge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGluUmVzcG9uc2UpO1xyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBuZXR3b3JrTm90QXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJOZXR3b3JrIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGNsaWVudEF1dGhlbnRpY2F0aW9uRmFpbGVkOiBmdW5jdGlvbiAoaW5FcnJvck1lc3NhZ2UpIHtcclxuICAvLyAgICAgICBjb25zb2xlLmxvZyhpbkVycm9yTWVzc2FnZSk7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIG9uRXJyb3JMb2FkaW5nV2ViUGFnZTogZnVuY3Rpb24gKFxyXG4gIC8vICAgICAgIGluaUVycm9yQ29kZSxcclxuICAvLyAgICAgICBpbkVycm9yTWVzc2FnZSxcclxuICAvLyAgICAgICBpbkZhaWxpbmdVcmxcclxuICAvLyAgICAgKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coaW5pRXJyb3JDb2RlLCBpbkVycm9yTWVzc2FnZSwgaW5GYWlsaW5nVXJsKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgb25CYWNrUHJlc3NlZENhbmNlbFRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJVc2VyIGNhbmNlbGxlZCB0cmFuc2FjdGlvbiBieSBwcmVzc2luZyBiYWNrIGJ1dHRvblwiKTtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgb25UcmFuc2FjdGlvbkNhbmNlbDogZnVuY3Rpb24gKGluRXJyb3JNZXNzYWdlLCBpblJlc3BvbnNlKSB7XHJcbiAgLy8gICAgICAgY29uc29sZS5sb2coaW5FcnJvck1lc3NhZ2UsIGluUmVzcG9uc2UpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KTtcclxuICAvLyB9XHJcbn0iXX0=