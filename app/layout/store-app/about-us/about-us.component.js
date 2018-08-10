"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../../core/services/store-app.service");
var Globals = require("../../../core/globals");
var common_1 = require("@angular/common");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_star_ratings_ext_1 = require("nativescript-star-ratings-ext");
element_registry_1.registerElement('StarRating', function () { return nativescript_star_ratings_ext_1.StarRating; });
var application_settings_1 = require("application-settings");
var StoreAppAboutUsComponent = /** @class */ (function () {
    function StoreAppAboutUsComponent(route, storeAppService, location) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.location = location;
        this.gallery_images = [];
    }
    StoreAppAboutUsComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
        this.value = 1;
        this.max = 15;
        this.user_id = application_settings_1.getString('user_id');
        // console.log(this.app_id)
    };
    StoreAppAboutUsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            if (_this.app_details.app_imgs.length > 0) {
                _this.app_details.app_imgs.forEach(function (x) {
                    var data = {
                        // title: this.app_details.business_name,
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
    StoreAppAboutUsComponent.prototype.toggleGallery = function () {
        this.gallery_visible_key = !this.gallery_visible_key;
    };
    StoreAppAboutUsComponent.prototype.rateApp = function () {
        var data = {
            app_master: this.app_id,
            customer: this.user_id,
            rating: this.value
        };
        this.storeAppService.appRate(data).subscribe(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppAboutUsComponent.prototype.getAppRatingValue = function () {
    };
    StoreAppAboutUsComponent = __decorate([
        core_1.Component({
            selector: 'about-us',
            moduleId: module.id,
            templateUrl: "about-us.component.html",
            styleUrls: ["about-us.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            store_app_service_1.StoreAppService,
            common_1.Location])
    ], StoreAppAboutUsComponent);
    return StoreAppAboutUsComponent;
}());
exports.StoreAppAboutUsComponent = StoreAppAboutUsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQtdXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELDBDQUEyQztBQUMzQywwRUFBd0U7QUFDeEUsK0VBQTJEO0FBQzNELGtDQUFlLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSwwQ0FBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBQ2hELDZEQUEyRjtBQVEzRjtJQVNFLGtDQUNVLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLFFBQWtCO1FBRmxCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUjVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO0lBV2hDLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQywyQkFBMkI7SUFDN0IsQ0FBQztJQUVELGdEQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDbkQsVUFBQSxHQUFHO1lBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2pDLElBQUksSUFBSSxHQUFHO3dCQUNULHlDQUF5Qzt3QkFDekMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU87cUJBQ3RDLENBQUE7b0JBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEMsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0QsZ0RBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDO0lBRUQsMENBQU8sR0FBUDtRQUNFLElBQUksSUFBSSxHQUFHO1lBQ1QsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbkIsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDMUMsVUFBQSxHQUFHO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFFRCxvREFBaUIsR0FBakI7SUFFQSxDQUFDO0lBdkVVLHdCQUF3QjtRQU5wQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FXaUIsdUJBQWM7WUFDSixtQ0FBZTtZQUN0QixpQkFBUTtPQVpqQix3QkFBd0IsQ0F3RXBDO0lBQUQsK0JBQUM7Q0FBQSxBQXhFRCxJQXdFQztBQXhFWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBTdGFyUmF0aW5nIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXN0YXItcmF0aW5ncy1leHQnO1xyXG5yZWdpc3RlckVsZW1lbnQoJ1N0YXJSYXRpbmcnLCAoKSA9PiBTdGFyUmF0aW5nKTtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Fib3V0LXVzJyxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBgYWJvdXQtdXMuY29tcG9uZW50Lmh0bWxgLFxyXG4gIHN0eWxlVXJsczogW2BhYm91dC11cy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQWJvdXRVc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgYXBwX2RldGFpbHM6IGFueTtcclxuICB2aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICBnYWxsZXJ5X2ltYWdlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIGdhbGxlcnlfdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgdmFsdWU6IG51bWJlcjtcclxuICBtYXg6IG51bWJlcjtcclxuICB1c2VyX2lkOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBfaWQpXHJcbiAgICB0aGlzLnZhbHVlID0gMTtcclxuICAgIHRoaXMubWF4ID0gMTU7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYXBwX2lkKVxyXG4gIH1cclxuXHJcbiAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICBpZiAodGhpcy5hcHBfZGV0YWlscy5hcHBfaW1ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmFwcF9kZXRhaWxzLmJ1c2luZXNzX25hbWUsXHJcbiAgICAgICAgICAgICAgdXJsOiBHbG9iYWxzLmltZ19iYXNlX3VybCArIHguYXBwX2ltZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeV9pbWFnZXMucHVzaChkYXRhKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWVcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nYWxsZXJ5X2ltYWdlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG4gIHRvZ2dsZUdhbGxlcnkoKSB7XHJcbiAgICB0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXkgPSAhdGhpcy5nYWxsZXJ5X3Zpc2libGVfa2V5O1xyXG4gIH1cclxuXHJcbiAgcmF0ZUFwcCgpIHtcclxuICAgIHZhciBkYXRhID0ge1xyXG4gICAgICBhcHBfbWFzdGVyOiB0aGlzLmFwcF9pZCxcclxuICAgICAgY3VzdG9tZXI6IHRoaXMudXNlcl9pZCxcclxuICAgICAgcmF0aW5nOiB0aGlzLnZhbHVlXHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5hcHBSYXRlKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0QXBwUmF0aW5nVmFsdWUoKXtcclxuXHJcbiAgfVxyXG59Il19