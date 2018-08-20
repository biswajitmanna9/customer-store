"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
var store_app_service_1 = require("../../services/store-app.service");
var AppActionBarComponent = /** @class */ (function () {
    function AppActionBarComponent(_routerExtensions, storeAppService, routerExtensions) {
        this._routerExtensions = _routerExtensions;
        this.storeAppService = storeAppService;
        this.routerExtensions = routerExtensions;
        this.product_list = [];
    }
    AppActionBarComponent.prototype.ngOnInit = function () {
        if (application_settings_1.getBoolean('isLoggedin')) {
            this.isLoggedin = application_settings_1.getBoolean('isLoggedin');
            // alert(this.isLoggedin)
        }
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
    AppActionBarComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    AppActionBarComponent.prototype.logout = function () {
        application_settings_1.clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
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
            store_app_service_1.StoreAppService,
            router_1.RouterExtensions])
    ], AppActionBarComponent);
    return AppActionBarComponent;
}());
exports.AppActionBarComponent = AppActionBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlEO0FBQ3pELHNEQUErRDtBQUMvRCw2REFBMkY7QUFDM0Ysc0VBQW1FO0FBUW5FO0lBTUksK0JBQ1ksaUJBQW1DLEVBQ25DLGVBQWdDLEVBQ2hDLGdCQUFrQztRQUZsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUDlDLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBVXZCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFBLENBQUMsaUNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLHlCQUF5QjtRQUM3QixDQUFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDZDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUM3QyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2hCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM5QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFDRCxzQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0ksNEJBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQTVDZTtRQUFmLFlBQUssQ0FBQyxPQUFPLENBQUM7O3dEQUFlO0lBSHJCLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQVFpQyx5QkFBZ0I7WUFDbEIsbUNBQWU7WUFDZCx5QkFBZ0I7T0FUckMscUJBQXFCLENBaURqQztJQUFELDRCQUFDO0NBQUEsQUFqREQsSUFpREM7QUFqRFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiYXBwLWFjdGlvbi1iYXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FwcC1hY3Rpb24tYmFyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAtYWN0aW9uLWJhci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEFjdGlvbkJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBhcHBfZGV0YWlsczogYW55O1xyXG4gICAgcHJvZHVjdF9saXN0OiBhbnkgPSBbXTtcclxuICAgIEBJbnB1dCgnYXBwSWQnKSBhcHBJZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICBpc0xvZ2dlZGluOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmKGdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2dnZWRpbiA9IGdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKTtcclxuICAgICAgICAgICAgLy8gYWxlcnQodGhpcy5pc0xvZ2dlZGluKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBJZCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGdldEFwcERldGFpbHMoaWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwX2RldGFpbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzLmFwcF9wcm9kdWN0X2NhdGVnb3JpZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB4LnByb2R1Y3RzLmZvckVhY2goeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdF9saXN0LnB1c2goeSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdF9saXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCl7XHJcbiAgICAgICAgY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG59Il19