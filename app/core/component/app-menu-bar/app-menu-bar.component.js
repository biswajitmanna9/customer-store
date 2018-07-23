"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../services/store-app.service");
var AppMenuBarComponent = /** @class */ (function () {
    function AppMenuBarComponent(route, storeAppService) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.product_list = [];
    }
    AppMenuBarComponent.prototype.ngOnInit = function () {
        this.getAppDetails(this.appId);
    };
    AppMenuBarComponent.prototype.getAppDetails = function (id) {
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
    ], AppMenuBarComponent.prototype, "appId", void 0);
    AppMenuBarComponent = __decorate([
        core_1.Component({
            selector: 'app-menu-bar',
            moduleId: module.id,
            templateUrl: "app-menu-bar.component.html",
            styleUrls: ["app-menu-bar.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            store_app_service_1.StoreAppService])
    ], AppMenuBarComponent);
    return AppMenuBarComponent;
}());
exports.AppMenuBarComponent = AppMenuBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLW1lbnUtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1tZW51LWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQWlEO0FBQ2pELHNFQUFtRTtBQU9uRTtJQUtJLDZCQUNZLEtBQXFCLEVBQ3JCLGVBQWdDO1FBRGhDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUw1QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQVF2QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCwyQ0FBYSxHQUFiLFVBQWMsRUFBRTtRQUFoQixpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUEsR0FBRztZQUNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFFLFVBQUEsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDO29CQUNqQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDN0IsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUMsQ0FBQTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDOUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBOUJlO1FBQWYsWUFBSyxDQUFDLE9BQU8sQ0FBQzs7c0RBQWU7SUFIckIsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO3lDQU9xQix1QkFBYztZQUNKLG1DQUFlO09BUG5DLG1CQUFtQixDQWtDL0I7SUFBRCwwQkFBQztDQUFBLEFBbENELElBa0NDO0FBbENZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtbWVudS1iYXInLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgYXBwLW1lbnUtYmFyLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BhcHAtbWVudS1iYXIuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNZW51QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9kZXRhaWxzOiBhbnk7XHJcbiAgICBwcm9kdWN0X2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgQElucHV0KCdhcHBJZCcpIGFwcElkOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlX2tleTogYm9vbGVhblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcElkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfZGV0YWlscy5hcHBfcHJvZHVjdF9jYXRlZ29yaWVzLmZvckVhY2goIHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHgucHJvZHVjdHMuZm9yRWFjaCggeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdF9saXN0LnB1c2goeSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdF9saXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59Il19