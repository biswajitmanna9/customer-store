"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var store_app_service_1 = require("../../services/store-app.service");
var AppActionBarComponent = /** @class */ (function () {
    function AppActionBarComponent(_routerExtensions, storeAppService) {
        this._routerExtensions = _routerExtensions;
        this.storeAppService = storeAppService;
        this.product_list = [];
    }
    AppActionBarComponent.prototype.ngOnInit = function () {
        this.getAppDetails(this.appId);
    };
    AppActionBarComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            _this.app_details.app_product_categories.forEach(function (x) {
                x.products.forEach(function (y) {
                    _this.product_list.push(y);
                });
            });
            console.log(res);
            console.log(_this.product_list);
            _this.visible_key = true;
        }, function (error) {
            console.log(error);
        });
    };
    __decorate([
        core_1.Input('appId'),
        __metadata("design:type", String)
    ], AppActionBarComponent.prototype, "appId", void 0);
    AppActionBarComponent = __decorate([
        core_1.Component({
            selector: "app-action-bar",
            moduleId: module.id,
            templateUrl: "./app-action-bar.component.html",
            styleUrls: ['./app-action-bar.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            store_app_service_1.StoreAppService])
    ], AppActionBarComponent);
    return AppActionBarComponent;
}());
exports.AppActionBarComponent = AppActionBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlEO0FBQ3pELHNEQUErRDtBQUUvRCxzRUFBbUU7QUFPbkU7SUFLSSwrQkFDWSxpQkFBbUMsRUFDbkMsZUFBZ0M7UUFEaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFMNUMsaUJBQVksR0FBUSxFQUFFLENBQUM7SUFRdkIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkNBQWEsR0FBYixVQUFjLEVBQUU7UUFBaEIsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNqRCxVQUFBLEdBQUc7WUFDQyxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixLQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDaEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzlCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQTlCZTtRQUFmLFlBQUssQ0FBQyxPQUFPLENBQUM7O3dEQUFlO0lBSHJCLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQU9pQyx5QkFBZ0I7WUFDbEIsbUNBQWU7T0FQbkMscUJBQXFCLENBa0NqQztJQUFELDRCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7QUFsQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJhcHAtYWN0aW9uLWJhclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC1hY3Rpb24tYmFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQWN0aW9uQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9kZXRhaWxzOiBhbnk7XHJcbiAgICBwcm9kdWN0X2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgQElucHV0KCdhcHBJZCcpIGFwcElkOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlX2tleTogYm9vbGVhblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwSWQpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfZGV0YWlscy5hcHBfcHJvZHVjdF9jYXRlZ29yaWVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeC5wcm9kdWN0cy5mb3JFYWNoKHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RfbGlzdC5wdXNoKHkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3RfbGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSJdfQ==