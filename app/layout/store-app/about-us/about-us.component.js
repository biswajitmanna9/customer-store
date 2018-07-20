"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../../core/services/store-app.service");
var Globals = require("../../../core/globals");
var common_1 = require("@angular/common");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQtdXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELDBDQUEyQztBQU8zQztJQU1FLGtDQUNVLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLFFBQWtCO1FBRmxCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTDVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO0lBUWhDLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsMkJBQTJCO0lBQzdCLENBQUM7SUFFRCxnREFBYSxHQUFiLFVBQWMsRUFBRTtRQUFoQixpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ25ELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO29CQUNqQyxJQUFJLElBQUksR0FBRzt3QkFDVCxLQUFLLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhO3dCQUNyQyxHQUFHLEVBQUUsT0FBTyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsT0FBTztxQkFDdEMsQ0FBQTtvQkFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEMsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNsQyxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFDRCxnREFBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7SUE3Q1Usd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN0QyxDQUFDO3lDQVFpQix1QkFBYztZQUNKLG1DQUFlO1lBQ3RCLGlCQUFRO09BVGpCLHdCQUF3QixDQThDcEM7SUFBRCwrQkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxzIGZyb20gJy4uLy4uLy4uL2NvcmUvZ2xvYmFscyc7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhYm91dC11cycsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogYGFib3V0LXVzLmNvbXBvbmVudC5odG1sYCxcclxuICBzdHlsZVVybHM6IFtgYWJvdXQtdXMuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcEFib3V0VXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFwcF9pZDogc3RyaW5nO1xyXG4gIGFwcF9kZXRhaWxzOiBhbnk7XHJcbiAgdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcbiAgZ2FsbGVyeV9pbWFnZXM6IEFycmF5PGFueT4gPSBbXTtcclxuICBnYWxsZXJ5X3Zpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwX2lkKVxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5hcHBfaWQpXHJcbiAgfVxyXG5cclxuICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuYXBwX2RldGFpbHMuYXBwX2ltZ3MuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuYXBwX2RldGFpbHMuYnVzaW5lc3NfbmFtZSxcclxuICAgICAgICAgICAgICB1cmw6IEdsb2JhbHMuaW1nX2Jhc2VfdXJsICsgeC5hcHBfaW1nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5X2ltYWdlcy5wdXNoKGRhdGEpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbGxlcnlfaW1hZ2VzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbiAgdG9nZ2xlR2FsbGVyeSgpIHtcclxuICAgIHRoaXMuZ2FsbGVyeV92aXNpYmxlX2tleSA9ICF0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXk7XHJcbiAgfVxyXG59Il19