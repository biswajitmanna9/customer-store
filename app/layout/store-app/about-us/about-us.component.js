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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQtdXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELDBDQUEyQztBQUMzQywwRUFBd0U7QUFDeEUsK0VBQTJEO0FBQzNELGtDQUFlLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSwwQ0FBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBQ2hELDZEQUEyRjtBQVEzRjtJQVNFLGtDQUNVLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLFFBQWtCO1FBRmxCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUjVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO0lBV2hDLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQywyQkFBMkI7SUFDN0IsQ0FBQztJQUVELGdEQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDbkQsVUFBQSxHQUFHO1lBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2pDLElBQUksSUFBSSxHQUFHO3dCQUNULEtBQUssRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7d0JBQ3JDLEdBQUcsRUFBRSxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxPQUFPO3FCQUN0QyxDQUFBO29CQUNELEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNoQyxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ2xDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNELGdEQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDdkQsQ0FBQztJQUVELDBDQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksR0FBRztZQUNULFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ25CLENBQUE7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQzFDLFVBQUEsR0FBRztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsb0RBQWlCLEdBQWpCO0lBRUEsQ0FBQztJQXZFVSx3QkFBd0I7UUFOcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3RDLENBQUM7eUNBV2lCLHVCQUFjO1lBQ0osbUNBQWU7WUFDdEIsaUJBQVE7T0FaakIsd0JBQXdCLENBd0VwQztJQUFELCtCQUFDO0NBQUEsQUF4RUQsSUF3RUM7QUF4RVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWxzJztcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgU3RhclJhdGluZyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zdGFyLXJhdGluZ3MtZXh0JztcclxucmVnaXN0ZXJFbGVtZW50KCdTdGFyUmF0aW5nJywgKCkgPT4gU3RhclJhdGluZyk7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhYm91dC11cycsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogYGFib3V0LXVzLmNvbXBvbmVudC5odG1sYCxcclxuICBzdHlsZVVybHM6IFtgYWJvdXQtdXMuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcEFib3V0VXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFwcF9pZDogc3RyaW5nO1xyXG4gIGFwcF9kZXRhaWxzOiBhbnk7XHJcbiAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgZ2FsbGVyeV9pbWFnZXM6IEFycmF5PGFueT4gPSBbXTtcclxuICBnYWxsZXJ5X3Zpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIHZhbHVlOiBudW1iZXI7XHJcbiAgbWF4OiBudW1iZXI7XHJcbiAgdXNlcl9pZDogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwX2lkKVxyXG4gICAgdGhpcy52YWx1ZSA9IDE7XHJcbiAgICB0aGlzLm1heCA9IDE1O1xyXG4gICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFwcF9pZClcclxuICB9XHJcblxyXG4gIGdldEFwcERldGFpbHMoaWQpIHtcclxuICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldFN0b3JlQXBwRGV0YWlscyhpZCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwX2RldGFpbHMgPSByZXM7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwX2RldGFpbHMuYXBwX2ltZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5hcHBfZGV0YWlscy5hcHBfaW1ncy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICB0aXRsZTogdGhpcy5hcHBfZGV0YWlscy5idXNpbmVzc19uYW1lLFxyXG4gICAgICAgICAgICAgIHVybDogR2xvYmFscy5pbWdfYmFzZV91cmwgKyB4LmFwcF9pbWdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnlfaW1hZ2VzLnB1c2goZGF0YSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2FsbGVyeV9pbWFnZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuICB0b2dnbGVHYWxsZXJ5KCkge1xyXG4gICAgdGhpcy5nYWxsZXJ5X3Zpc2libGVfa2V5ID0gIXRoaXMuZ2FsbGVyeV92aXNpYmxlX2tleTtcclxuICB9XHJcblxyXG4gIHJhdGVBcHAoKSB7XHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgYXBwX21hc3RlcjogdGhpcy5hcHBfaWQsXHJcbiAgICAgIGN1c3RvbWVyOiB0aGlzLnVzZXJfaWQsXHJcbiAgICAgIHJhdGluZzogdGhpcy52YWx1ZVxyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuYXBwUmF0ZShkYXRhKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIGdldEFwcFJhdGluZ1ZhbHVlKCl7XHJcblxyXG4gIH1cclxufSJdfQ==