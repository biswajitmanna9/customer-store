"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
var application_settings_1 = require("application-settings");
var StoreAppCartComponent = /** @class */ (function () {
    function StoreAppCartComponent(route, location) {
        this.route = route;
        this.location = location;
        this.secureStorage = new nativescript_secure_storage_1.SecureStorage();
    }
    StoreAppCartComponent.prototype.ngOnInit = function () {
        var _this = this;
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        this.secureStorage.get({
            key: "cart"
        }).then(function (value) {
            var data = JSON.parse(value);
            console.log(data);
            if (data != null) {
                var filteredData = data.filter(function (x) { return x.customer_id == _this.user_id && x.app_id == _this.app_id; });
                _this.customer_cart_data = filteredData;
            }
            else {
                _this.customer_cart_data = [];
            }
            _this.visible_key = true;
        });
    };
    StoreAppCartComponent.prototype.getDiscount = function (price, discounted_price) {
        return ((price - discounted_price) * 100) / 100 + '%';
    };
    StoreAppCartComponent = __decorate([
        core_1.Component({
            selector: "cart",
            moduleId: module.id,
            templateUrl: "./cart.component.html",
            styleUrls: ['./cart.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location])
    ], StoreAppCartComponent);
    return StoreAppCartComponent;
}());
exports.StoreAppCartComponent = StoreAppCartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDJFQUE0RDtBQUM1RCw2REFBMkY7QUFPM0Y7SUFNRSwrQkFDVSxLQUFxQixFQUNyQixRQUFrQjtRQURsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRTFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwyQ0FBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQ3JCLEdBQUcsRUFBRSxNQUFNO1NBQ1osQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFBLEtBQUs7WUFDSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFJLENBQUMsTUFBTSxFQUF4RCxDQUF3RCxDQUFDLENBQUE7Z0JBQzdGLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7WUFDekMsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUUsZ0JBQWdCO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN4RCxDQUFDO0lBckNVLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQzt5Q0FRaUIsdUJBQWM7WUFDWCxpQkFBUTtPQVJqQixxQkFBcUIsQ0FzQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VjdXJlU3RvcmFnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc2VjdXJlLXN0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImNhcnRcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vY2FydC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogWycuL2NhcnQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcENhcnRDb21wb25lbnQge1xyXG4gIGFwcF9pZDogc3RyaW5nO1xyXG4gIHNlY3VyZVN0b3JhZ2U6IFNlY3VyZVN0b3JhZ2U7XHJcbiAgY3VzdG9tZXJfY2FydF9kYXRhOiBhbnk7XHJcbiAgdXNlcl9pZDogc3RyaW5nO1xyXG4gIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICApIHtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZSA9IG5ldyBTZWN1cmVTdG9yYWdlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIHRoaXMuc2VjdXJlU3RvcmFnZS5nZXQoe1xyXG4gICAgICBrZXk6IFwiY2FydFwiXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICB2YWx1ZSA9PiB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICB2YXIgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoeCA9PiB4LmN1c3RvbWVyX2lkID09IHRoaXMudXNlcl9pZCAmJiB4LmFwcF9pZCA9PSB0aGlzLmFwcF9pZClcclxuICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gZmlsdGVyZWREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY3VzdG9tZXJfY2FydF9kYXRhID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzY291bnQocHJpY2UsIGRpc2NvdW50ZWRfcHJpY2UpIHtcclxuICAgIHJldHVybiAoKHByaWNlIC0gZGlzY291bnRlZF9wcmljZSkgKiAxMDApIC8gMTAwICsgJyUnO1xyXG4gIH1cclxufSJdfQ==