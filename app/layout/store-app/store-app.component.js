"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../core/services/store-app.service");
var StoreAppComponent = /** @class */ (function () {
    function StoreAppComponent(route, storeAppService) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.images = [];
        this.images = [
            {
                title: 'Image 4 (URL)',
                url: 'https://unsplash.it/400/300/?image=868'
            },
            {
                title: 'Image 5 (URL)',
                url: 'https://unsplash.it/400/300/?image=870'
            },
            {
                title: 'Image 6 (URL)',
                url: 'https://unsplash.it/400/300/?image=876'
            },
        ];
    }
    StoreAppComponent.prototype.ngOnInit = function () {
        this.app_id = this.route.snapshot.params["id"];
        this.getAppDetails(this.app_id);
        // console.log(this.route.snapshot.params["id"])
    };
    StoreAppComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            _this.visible_key = true;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppComponent.prototype.toggleGallery = function () {
        this.gallery_visible_key = !this.gallery_visible_key;
    };
    StoreAppComponent = __decorate([
        core_1.Component({
            selector: 'store-app',
            moduleId: module.id,
            templateUrl: "store-app.component.html",
            styleUrls: ["store-app.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            store_app_service_1.StoreAppService])
    ], StoreAppComponent);
    return StoreAppComponent;
}());
exports.StoreAppComponent = StoreAppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JlLWFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELDJFQUF1RTtBQU92RTtJQU1FLDJCQUNVLEtBQXFCLEVBQ3JCLGVBQWdDO1FBRGhDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUpoQyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBTWhDLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWjtnQkFDRSxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsR0FBRyxFQUFFLHdDQUF3QzthQUM5QztZQUNEO2dCQUNFLEtBQUssRUFBRSxlQUFlO2dCQUN0QixHQUFHLEVBQUUsd0NBQXdDO2FBQzlDO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLEdBQUcsRUFBRSx3Q0FBd0M7YUFDOUM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvQixnREFBZ0Q7SUFDbEQsQ0FBQztJQUVELHlDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ25ELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0QseUNBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDO0lBOUNVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FRaUIsdUJBQWM7WUFDSixtQ0FBZTtPQVIvQixpQkFBaUIsQ0ErQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIlxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0b3JlLWFwcCcsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogYHN0b3JlLWFwcC5jb21wb25lbnQuaHRtbGAsXHJcbiAgc3R5bGVVcmxzOiBbYHN0b3JlLWFwcC5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhcHBfaWQ6IHN0cmluZztcclxuICBhcHBfZGV0YWlsczogYW55O1xyXG4gIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIHByb3RlY3RlZCBpbWFnZXM6IEFycmF5PGFueT4gPSBbXTtcclxuICBnYWxsZXJ5X3Zpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmltYWdlcyA9IFsgICAgICBcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnSW1hZ2UgNCAoVVJMKScsXHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly91bnNwbGFzaC5pdC80MDAvMzAwLz9pbWFnZT04NjgnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0ltYWdlIDUgKFVSTCknLFxyXG4gICAgICAgIHVybDogJ2h0dHBzOi8vdW5zcGxhc2guaXQvNDAwLzMwMC8/aW1hZ2U9ODcwJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdJbWFnZSA2IChVUkwpJyxcclxuICAgICAgICB1cmw6ICdodHRwczovL3Vuc3BsYXNoLml0LzQwMC8zMDAvP2ltYWdlPTg3NidcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYXBwX2lkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcF9pZClcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl0pXHJcbiAgfVxyXG5cclxuICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZV9rZXkgPSB0cnVlXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbiAgdG9nZ2xlR2FsbGVyeSgpIHtcclxuICAgIHRoaXMuZ2FsbGVyeV92aXNpYmxlX2tleSA9ICF0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXk7XHJcbiAgfVxyXG59Il19