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
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var StoreAppAboutUsComponent = /** @class */ (function () {
    function StoreAppAboutUsComponent(route, storeAppService, location) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.location = location;
        this.gallery_images = [];
        this.rating = [1, 2, 3, 4, 5];
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        this.lodaing_options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: false,
                cancelListener: function (dialog) { console.log("Loading cancelled"); },
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
            ios: {
                details: "Additional detail note!",
                margin: 10,
                dimBackground: true,
                color: "#4B9ED6",
                backgroundColor: "yellow",
                userInteractionEnabled: false,
                hideBezel: true,
            }
        };
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
        this.loader.show(this.lodaing_options);
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
            _this.loader.hide();
        }, function (error) {
            _this.loader.hide();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQtdXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCw4RUFBMkU7QUFDM0UsK0NBQWlEO0FBQ2pELDBDQUEyQztBQUMzQywwRUFBd0U7QUFDeEUsdUVBQXVEO0FBQ3ZELGtDQUFlLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSxzQ0FBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBQ2hELDZEQUEyRjtBQUMzRixpRkFBa0U7QUFRbEU7SUFrQ0Usa0NBQ1UsS0FBcUIsRUFDckIsZUFBZ0MsRUFDaEMsUUFBa0I7UUFGbEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFqQzVCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBSWhDLFdBQU0sR0FBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5QixXQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUc7WUFDaEIsT0FBTyxFQUFFLFlBQVk7WUFDckIsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixjQUFjLEVBQUUsVUFBVSxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDdEUsR0FBRyxFQUFFLEdBQUc7Z0JBQ1Isb0JBQW9CLEVBQUUsU0FBUztnQkFDL0IscUJBQXFCLEVBQUUsSUFBSTtnQkFDM0IsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLGlCQUFpQixFQUFFLENBQUM7YUFDckI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLEtBQUssRUFBRSxTQUFTO2dCQUNoQixlQUFlLEVBQUUsUUFBUTtnQkFDekIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0IsU0FBUyxFQUFFLElBQUk7YUFDaEI7U0FDRixDQUFBO0lBT0QsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnREFBYSxHQUFiLFVBQWMsRUFBRTtRQUFoQixpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNuRCxVQUFBLEdBQUc7WUFDRCxvREFBb0Q7WUFDcEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2pDLElBQUksSUFBSSxHQUFHO3dCQUNULHlDQUF5Qzt3QkFDekMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU87cUJBQ3RDLENBQUE7b0JBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELGdEQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDdkQsQ0FBQztJQUdELDBDQUFPLEdBQVAsVUFBUSxHQUFHO1FBQVgsaUJBZ0JDO1FBZkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJLElBQUksR0FBRztZQUNULFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFBO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUMxQyxVQUFBLEdBQUc7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFBO1FBQ3pCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELG9EQUFpQixHQUFqQjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNwRSxVQUFDLEdBQVU7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQWpIVSx3QkFBd0I7UUFOcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3RDLENBQUM7eUNBb0NpQix1QkFBYztZQUNKLG1DQUFlO1lBQ3RCLGlCQUFRO09BckNqQix3QkFBd0IsQ0FrSHBDO0lBQUQsK0JBQUM7Q0FBQSxBQWxIRCxJQWtIQztBQWxIWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBTdGFyUmF0aW5nIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXN0YXItcmF0aW5ncyc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnU3RhclJhdGluZycsICgpID0+IFN0YXJSYXRpbmcpO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWJvdXQtdXMnLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IGBhYm91dC11cy5jb21wb25lbnQuaHRtbGAsXHJcbiAgc3R5bGVVcmxzOiBbYGFib3V0LXVzLmNvbXBvbmVudC5jc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RvcmVBcHBBYm91dFVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhcHBfaWQ6IHN0cmluZztcclxuICBhcHBfZGV0YWlsczogYW55O1xyXG4gIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIGdhbGxlcnlfaW1hZ2VzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgZ2FsbGVyeV92aXNpYmxlX2tleTogYm9vbGVhbjtcclxuXHJcbiAgdXNlcl9pZDogc3RyaW5nO1xyXG4gIHJhdGluZzogYW55ID0gWzEsIDIsIDMsIDQsIDVdO1xyXG4gIHJhdGluZ192YWx1ZTogbnVtYmVyO1xyXG4gIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbiAgbG9kYWluZ19vcHRpb25zID0ge1xyXG4gICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICBhbmRyb2lkOiB7XHJcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24gKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgICAgIG1heDogMTAwLFxyXG4gICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgIH0sXHJcbiAgICBpb3M6IHtcclxuICAgICAgZGV0YWlsczogXCJBZGRpdGlvbmFsIGRldGFpbCBub3RlIVwiLFxyXG4gICAgICBtYXJnaW46IDEwLFxyXG4gICAgICBkaW1CYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcclxuICAgICAgdXNlckludGVyYWN0aW9uRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhpZGVCZXplbDogdHJ1ZSxcclxuICAgIH1cclxuICB9XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgc3RvcmVBcHBTZXJ2aWNlOiBTdG9yZUFwcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgIHRoaXMuYXBwX2lkID0gZnVsbF9sb2NhdGlvblsyXS50cmltKCk7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYXBwX2lkKVxyXG4gICAgdGhpcy5nZXRBcHBEZXRhaWxzKHRoaXMuYXBwX2lkKVxyXG4gICAgdGhpcy5nZXRBcHBSYXRpbmdWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXBwRGV0YWlscyhpZCkge1xyXG4gICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLmxvZGFpbmdfb3B0aW9ucyk7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICAvLyByZXNbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQocmVzWydhdmdfcmF0aW5nJ10pXHJcbiAgICAgICAgdGhpcy5hcHBfZGV0YWlscyA9IHJlcztcclxuICAgICAgICBpZiAodGhpcy5hcHBfZGV0YWlscy5hcHBfaW1ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmFwcF9kZXRhaWxzLmJ1c2luZXNzX25hbWUsXHJcbiAgICAgICAgICAgICAgdXJsOiBHbG9iYWxzLmltZ19iYXNlX3VybCArIHguYXBwX2ltZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeV9pbWFnZXMucHVzaChkYXRhKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWVcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nYWxsZXJ5X2ltYWdlcylcclxuICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHRvZ2dsZUdhbGxlcnkoKSB7XHJcbiAgICB0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXkgPSAhdGhpcy5nYWxsZXJ5X3Zpc2libGVfa2V5O1xyXG4gIH1cclxuXHJcblxyXG4gIHJhdGVBcHAodmFsKSB7XHJcbiAgICBjb25zb2xlLmxvZyh2YWwpXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgYXBwX21hc3RlcjogdGhpcy5hcHBfaWQsXHJcbiAgICAgIGN1c3RvbWVyOiB0aGlzLnVzZXJfaWQsXHJcbiAgICAgIHJhdGluZzogdmFsXHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5hcHBSYXRlKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgdGhpcy5yYXRpbmdfdmFsdWUgPSB2YWxcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBnZXRBcHBSYXRpbmdWYWx1ZSgpIHtcclxuICAgIHRoaXMuc3RvcmVBcHBTZXJ2aWNlLmdldEFwcFJhdGluZyh0aGlzLnVzZXJfaWQsIHRoaXMuYXBwX2lkKS5zdWJzY3JpYmUoXHJcbiAgICAgIChyZXM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5yYXRpbmdfdmFsdWUgPSByZXNbMF1bJ3JhdGluZyddO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG59Il19