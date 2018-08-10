"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../../core/services/store-app.service");
var Globals = require("../../../core/globals");
var router_2 = require("nativescript-angular/router");
var AppDetailsComponent = /** @class */ (function () {
    function AppDetailsComponent(route, storeAppService, routerExtensions) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.routerExtensions = routerExtensions;
        this.gallery_images = [];
    }
    AppDetailsComponent.prototype.ngOnInit = function () {
        this.app_id = this.route.snapshot.params['id'];
        console.log(this.route.snapshot.params['id']);
        this.getAppDetails(this.app_id);
    };
    AppDetailsComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    AppDetailsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            if (_this.app_details.app_imgs.length > 0) {
                _this.app_details.app_imgs.forEach(function (x) {
                    var data = {
                        title: _this.app_details.business_name,
                        url: Globals.img_base_url + x.app_img
                    };
                    _this.gallery_images.push(data);
                });
            }
            _this.visible_key = true;
            console.log(res);
            console.log(_this.gallery_images);
        }, function (error) {
            console.log(error);
        });
    };
    AppDetailsComponent.prototype.toggleGallery = function () {
        this.gallery_visible_key = !this.gallery_visible_key;
    };
    AppDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-details',
            moduleId: module.id,
            templateUrl: "app-details.component.html",
            styleUrls: ["app-details.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            store_app_service_1.StoreAppService,
            router_2.RouterExtensions])
    ], AppDetailsComponent);
    return AppDetailsComponent;
}());
exports.AppDetailsComponent = AppDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELHNEQUErRDtBQU8vRDtJQU1JLDZCQUNZLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLGdCQUFrQztRQUZsQyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUw5QyxtQkFBYyxHQUFlLEVBQUUsQ0FBQztJQVFoQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELDJDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQXFCQztRQXBCRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQy9CLElBQUksSUFBSSxHQUFHO3dCQUNQLEtBQUssRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7d0JBQ3JDLEdBQUcsRUFBRSxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxPQUFPO3FCQUN4QyxDQUFBO29CQUNELEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3BDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELDJDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDekQsQ0FBQztJQWhEUSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7eUNBUXFCLHVCQUFjO1lBQ0osbUNBQWU7WUFDZCx5QkFBZ0I7T0FUckMsbUJBQW1CLENBaUQvQjtJQUFELDBCQUFDO0NBQUEsQUFqREQsSUFpREM7QUFqRFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWxzJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC1kZXRhaWxzJyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogYGFwcC1kZXRhaWxzLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BhcHAtZGV0YWlscy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgICBhcHBfZGV0YWlsczogYW55O1xyXG4gICAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgICBnYWxsZXJ5X2ltYWdlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZ2FsbGVyeV92aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXSlcclxuICAgICAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBfaWQpXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldFN0b3JlQXBwRGV0YWlscyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuYXBwX2RldGFpbHMuYnVzaW5lc3NfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogR2xvYmFscy5pbWdfYmFzZV91cmwgKyB4LmFwcF9pbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbGxlcnlfaW1hZ2VzLnB1c2goZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2FsbGVyeV9pbWFnZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgdG9nZ2xlR2FsbGVyeSgpIHtcclxuICAgICAgICB0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXkgPSAhdGhpcy5nYWxsZXJ5X3Zpc2libGVfa2V5O1xyXG4gICAgfVxyXG59Il19