"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../../core/services/store-app.service");
var router_2 = require("@angular/router");
var StoreAppCartComponent = /** @class */ (function () {
    function StoreAppCartComponent(route, location, storeAppService, router) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
        this.order = new store_app_service_1.OrderModule();
    }
    StoreAppCartComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.populateData();
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
    StoreAppCartComponent.prototype.pay = function () {
        var _this = this;
        this.order.customer = this.user_id;
        this.order.price = this.total_item_price + this.total_packing_price;
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
        this.setCartData();
        this.storeAppService.createOrder(this.order).subscribe(function (res) {
            console.log(res);
            _this.router.navigate(['/store-app/', _this.app_id, 'payment']);
        }, function (error) {
            console.log(error);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsOEVBQXNHO0FBQ3RHLDBDQUF5QztBQU96QztJQVdFLCtCQUNVLEtBQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLE1BQWM7UUFIZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwyQ0FBYSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLCtCQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDRDQUFZLEdBQVo7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDckIsR0FBRyxFQUFFLE1BQU07U0FDWixDQUFDLENBQUMsSUFBSSxDQUNMLFVBQUEsS0FBSztZQUNILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENB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QyxDQUFDO1lBQ3hJLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FDcEQsVUFBQSxHQUFHO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFDaEUsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBNUpVLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQzt5Q0FhaUIsdUJBQWM7WUFDWCxpQkFBUTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07T0FmYixxQkFBcUIsQ0E2SmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTdKRCxJQTZKQztBQTdKWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSwgT3JkZXJNb2R1bGUsIE9yZGVyRGV0YWlscyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiY2FydFwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9jYXJ0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY2FydC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQ2FydENvbXBvbmVudCB7XHJcbiAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZTtcclxuICBjdXN0b21lcl9jYXJ0X2RhdGE6IGFueTtcclxuICB1c2VyX2lkOiBzdHJpbmc7XHJcbiAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgdG90YWxfaXRlbV9wcmljZTogbnVtYmVyO1xyXG4gIHRvdGFsX3BhY2tpbmdfcHJpY2U6IG51bWJlcjtcclxuICB0b3RhbF9wcmljZTogbnVtYmVyO1xyXG4gIGFsbF9jYXJ0X2RhdGE6IGFueTtcclxuICBvcmRlcjogT3JkZXJNb2R1bGU7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XHJcbiAgICB0aGlzLm9yZGVyID0gbmV3IE9yZGVyTW9kdWxlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIHRoaXMucG9wdWxhdGVEYXRhKCk7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZURhdGEoKSB7XHJcbiAgICB0aGlzLnNlY3VyZVN0b3JhZ2UuZ2V0KHtcclxuICAgICAga2V5OiBcImNhcnRcIlxyXG4gICAgfSkudGhlbihcclxuICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgIHZhciBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkKVxyXG4gICAgICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEgPSBmaWx0ZXJlZERhdGE7XHJcbiAgICAgICAgICB0aGlzLmdldFRvdGFsSXRlbVByaWNlKCk7XHJcbiAgICAgICAgICB0aGlzLmdldFRvdGFsUGFja2luZ1ByaWNlKCk7XHJcbiAgICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldERpc2NvdW50KHByaWNlLCBkaXNjb3VudGVkX3ByaWNlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKHByaWNlIC0gZGlzY291bnRlZF9wcmljZSkgKiAxMDApIC8gcHJpY2UpICsgJyUnO1xyXG4gIH1cclxuXHJcbiAgaW5jcmVtZW50KGkpIHtcclxuICAgIHZhciBxdHkgPSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5xdWFudGl0eTtcclxuICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5ID0gcXR5ICsgMTtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeCA9PiB4LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB4LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB4LnByb2R1Y3RfaWQgPT0gdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGFbaV0ucHJvZHVjdF9pZCk7XHJcbiAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgdGhpcy5hbGxfY2FydF9kYXRhW2luZGV4XS5xdWFudGl0eSA9IHF0eSArIDE7XHJcbiAgICAgIHRoaXMuc2V0Q2FydERhdGEoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVjcmVtZW50KGkpIHtcclxuICAgIHZhciBxdHkgPSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5xdWFudGl0eTtcclxuICAgIGlmIChxdHkgPiAxKSB7XHJcbiAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhW2ldLnF1YW50aXR5ID0gcXR5IC0gMTtcclxuICAgICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHgucHJvZHVjdF9pZCA9PSB0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5wcm9kdWN0X2lkKTtcclxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhW2luZGV4XS5xdWFudGl0eSA9IHF0eSAtIDE7XHJcbiAgICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLmN1c3RvbWVyX2NhcnRfZGF0YVtpXS5wcm9kdWN0X2lkKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VG90YWxJdGVtUHJpY2UoKSB7XHJcbiAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgPSAwO1xyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgaWYgKHguZGlzY291bnRlZF9wcmljZSA+IDApIHtcclxuICAgICAgICB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKz0gKHguZGlzY291bnRlZF9wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMudG90YWxfaXRlbV9wcmljZSArPSAoeC5wcmljZSAqIHgucXVhbnRpdHkpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZ2V0VG90YWxQYWNraW5nUHJpY2UoKSB7XHJcbiAgICB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2UgPSAwO1xyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgdGhpcy50b3RhbF9wYWNraW5nX3ByaWNlICs9IHgucGFja2luZ19jaGFyZ2VzO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlbW92ZShpZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hbGxfY2FydF9kYXRhLmZpbmRJbmRleCh4ID0+IHguY3VzdG9tZXJfaWQgPT0gdGhpcy51c2VyX2lkICYmIHguYXBwX2lkID09IHRoaXMuYXBwX2lkICYmIHgucHJvZHVjdF9pZCA9PSBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhpbmRleClcclxuICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmFsbF9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgdGhpcy5zZXRDYXJ0RGF0YSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRDYXJ0RGF0YSgpIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xyXG4gICAgICBrZXk6ICdjYXJ0JyxcclxuICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsX2NhcnRfZGF0YSlcclxuICAgIH0pLnRoZW4oc3VjY2VzcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN1Y2Nlc3MpXHJcbiAgICAgIHRoaXMuZ2V0VG90YWxJdGVtUHJpY2UoKTtcclxuICAgICAgdGhpcy5nZXRUb3RhbFBhY2tpbmdQcmljZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcGF5KCkge1xyXG4gICAgdGhpcy5vcmRlci5jdXN0b21lciA9IHRoaXMudXNlcl9pZDtcclxuICAgIHRoaXMub3JkZXIucHJpY2UgPSB0aGlzLnRvdGFsX2l0ZW1fcHJpY2UgKyB0aGlzLnRvdGFsX3BhY2tpbmdfcHJpY2U7XHJcbiAgICB2YXIgZGV0YWlsc19kYXRhID0gbmV3IE9yZGVyRGV0YWlscygpO1xyXG4gICAgdmFyIGFsbF9kZXRhaWxzX2RhdGEgPSBbXVxyXG4gICAgdGhpcy5jdXN0b21lcl9jYXJ0X2RhdGEuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgZGV0YWlsc19kYXRhLmFwcG1hc3RlciA9IHguYXBwX2lkO1xyXG4gICAgICBpZiAoeC5kaXNjb3VudGVkX3ByaWNlID4gMCkge1xyXG4gICAgICAgIGRldGFpbHNfZGF0YS51bml0X3ByaWNlID0geC5kaXNjb3VudGVkX3ByaWNlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGRldGFpbHNfZGF0YS51bml0X3ByaWNlID0geC5wcmljZTtcclxuICAgICAgfVxyXG4gICAgICBkZXRhaWxzX2RhdGEucXVhbnRpdHkgPSB4LnF1YW50aXR5O1xyXG4gICAgICBkZXRhaWxzX2RhdGEucHJvZHVjdCA9IHgucHJvZHVjdF9pZDtcclxuICAgICAgZGV0YWlsc19kYXRhLnBhY2thZ2luZ19jb3N0ID0geC5wYWNraW5nX2NoYXJnZXM7XHJcbiAgICAgIGRldGFpbHNfZGF0YS51b20gPSBcIjBcIjtcclxuICAgICAgZGV0YWlsc19kYXRhLklHU1QgPSBcIjBcIjtcclxuICAgICAgZGV0YWlsc19kYXRhLkNHU1QgPSBcIjBcIjtcclxuICAgICAgYWxsX2RldGFpbHNfZGF0YS5wdXNoKGRldGFpbHNfZGF0YSk7XHJcbiAgICAgIHZhciBpbmRleCA9IHRoaXMuYWxsX2NhcnRfZGF0YS5maW5kSW5kZXgoeSA9PiB5LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB5LmFwcF9pZCA9PSB0aGlzLmFwcF9pZCAmJiB5LnByb2R1Y3RfaWQgPT0geC5wcm9kdWN0X2lkKTtcclxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgdGhpcy5hbGxfY2FydF9kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB0aGlzLm9yZGVyLm9yZGVyX2RldGFpbHMgPSBhbGxfZGV0YWlsc19kYXRhO1xyXG4gICAgdGhpcy5zZXRDYXJ0RGF0YSgpO1xyXG4gICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuY3JlYXRlT3JkZXIodGhpcy5vcmRlcikuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJywgdGhpcy5hcHBfaWQgLCAncGF5bWVudCddKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbn0iXX0=