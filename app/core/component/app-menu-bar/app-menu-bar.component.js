"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../services/store-app.service");
var AppMenuBarComponent = /** @class */ (function () {
    function AppMenuBarComponent(route, storeAppService) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.category_list = [];
    }
    AppMenuBarComponent.prototype.ngOnInit = function () {
        this.app_id = this.route.snapshot.params["id"];
        // console.log(this.route.snapshot.params["id"])
        this.getAppDetails(this.app_id);
    };
    AppMenuBarComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            _this.category_list = _this.app_details.app_product_categories;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLW1lbnUtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1tZW51LWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELHNFQUFtRTtBQU9uRTtJQUlJLDZCQUNZLEtBQXFCLEVBQ3JCLGVBQWdDO1FBRGhDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUg1QyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztJQU14QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLEVBQUU7UUFBaEIsaUJBV0M7UUFWRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDO1lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBNUJRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQzt5Q0FNcUIsdUJBQWM7WUFDSixtQ0FBZTtPQU5uQyxtQkFBbUIsQ0E2Qi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTdCRCxJQTZCQztBQTdCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtbWVudS1iYXInLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgYXBwLW1lbnUtYmFyLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BhcHAtbWVudS1iYXIuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNZW51QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgYXBwX2RldGFpbHM6IGFueTtcclxuICAgIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBwX2lkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdKVxyXG4gICAgICAgIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcF9pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldFN0b3JlQXBwRGV0YWlscyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHRoaXMuYXBwX2RldGFpbHMuYXBwX3Byb2R1Y3RfY2F0ZWdvcmllcztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iXX0=