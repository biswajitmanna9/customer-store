"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../../core/services/store-app.service");
var Globals = require("../../../core/globals");
var common_1 = require("@angular/common");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_star_ratings_1 = require("nativescript-star-ratings");
element_registry_1.registerElement('StarRating', function () { return nativescript_star_ratings_1.StarRating; });
var application_settings_1 = require("application-settings");
var StoreAppAboutUsComponent = /** @class */ (function () {
    function StoreAppAboutUsComponent(route, storeAppService, location) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.location = location;
        this.gallery_images = [];
        this.rating = [1, 2, 3, 4, 5];
    }
    StoreAppAboutUsComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.user_id = application_settings_1.getString('user_id');
        // console.log(this.app_id)
        this.getAppDetails(this.app_id);
        this.getAppRatingValue();
    };
    StoreAppAboutUsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            // res['avg_rating'] = Math.round(res['avg_rating'])
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
    StoreAppAboutUsComponent.prototype.rateApp = function (val) {
        var _this = this;
        console.log(val);
        var data = {
            app_master: this.app_id,
            customer: this.user_id,
            rating: val
        };
        this.storeAppService.appRate(data).subscribe(function (res) {
            console.log(res);
            _this.rating_value = val;
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppAboutUsComponent.prototype.getAppRatingValue = function () {
        var _this = this;
        this.storeAppService.getAppRating(this.user_id, this.app_id).subscribe(function (res) {
            console.log(res);
            if (res.length > 0) {
                _this.rating_value = res[0]['rating'];
            }
        }, function (error) {
            console.log(error);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQtdXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELDBDQUEyQztBQUMzQywwRUFBd0U7QUFDeEUsdUVBQXVEO0FBQ3ZELGtDQUFlLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSxzQ0FBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBQ2hELDZEQUEyRjtBQVEzRjtJQVVFLGtDQUNVLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLFFBQWtCO1FBRmxCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBVDVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBSWhDLFdBQU0sR0FBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQVE5QixDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNFLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdEQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQXNCQztRQXJCQyxJQUFJ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RkQsSUF1RkM7QUF2RlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbHMgZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWxzJztcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgU3RhclJhdGluZyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zdGFyLXJhdGluZ3MnO1xyXG5yZWdpc3RlckVsZW1lbnQoJ1N0YXJSYXRpbmcnLCAoKSA9PiBTdGFyUmF0aW5nKTtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Fib3V0LXVzJyxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBgYWJvdXQtdXMuY29tcG9uZW50Lmh0bWxgLFxyXG4gIHN0eWxlVXJsczogW2BhYm91dC11cy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQWJvdXRVc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgYXBwX2lkOiBzdHJpbmc7XHJcbiAgYXBwX2RldGFpbHM6IGFueTtcclxuICB2aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICBnYWxsZXJ5X2ltYWdlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIGdhbGxlcnlfdmlzaWJsZV9rZXk6IGJvb2xlYW47XHJcblxyXG4gIHVzZXJfaWQ6IHN0cmluZztcclxuICByYXRpbmc6IGFueSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICByYXRpbmdfdmFsdWU6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdmFyIGZ1bGxfbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xyXG4gICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgIHRoaXMudXNlcl9pZCA9IGdldFN0cmluZygndXNlcl9pZCcpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5hcHBfaWQpXHJcbiAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBfaWQpXHJcbiAgICB0aGlzLmdldEFwcFJhdGluZ1ZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICAvLyByZXNbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQocmVzWydhdmdfcmF0aW5nJ10pXHJcbiAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICBpZiAodGhpcy5hcHBfZGV0YWlscy5hcHBfaW1ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmFwcF9kZXRhaWxzLmJ1c2luZXNzX25hbWUsXHJcbiAgICAgICAgICAgICAgdXJsOiBHbG9iYWxzLmltZ19iYXNlX3VybCArIHguYXBwX2ltZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeV9pbWFnZXMucHVzaChkYXRhKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWVcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nYWxsZXJ5X2ltYWdlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICB0b2dnbGVHYWxsZXJ5KCkge1xyXG4gICAgdGhpcy5nYWxsZXJ5X3Zpc2libGVfa2V5ID0gIXRoaXMuZ2FsbGVyeV92aXNpYmxlX2tleTtcclxuICB9XHJcblxyXG5cclxuICByYXRlQXBwKHZhbCkge1xyXG4gICAgY29uc29sZS5sb2codmFsKVxyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIGFwcF9tYXN0ZXI6IHRoaXMuYXBwX2lkLFxyXG4gICAgICBjdXN0b21lcjogdGhpcy51c2VyX2lkLFxyXG4gICAgICByYXRpbmc6IHZhbFxyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuYXBwUmF0ZShkYXRhKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIHRoaXMucmF0aW5nX3ZhbHVlID0gdmFsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0QXBwUmF0aW5nVmFsdWUoKSB7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRBcHBSYXRpbmcodGhpcy51c2VyX2lkLCB0aGlzLmFwcF9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBpZihyZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB0aGlzLnJhdGluZ192YWx1ZSA9IHJlc1swXVsncmF0aW5nJ107XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxufSJdfQ==