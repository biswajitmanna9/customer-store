"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_app_service_1 = require("../../core/services/store-app.service");
var Globals = require("../../core/globals");
var StoreAppComponent = /** @class */ (function () {
    function StoreAppComponent(route, storeAppService) {
        this.route = route;
        this.storeAppService = storeAppService;
        this.gallery_images = [];
        // this.gallery_images = [      
        //   {
        //     title: 'Image 4 (URL)',
        //     url: 'https://unsplash.it/400/300/?image=868'
        //   },
        //   {
        //     title: 'Image 5 (URL)',
        //     url: 'https://unsplash.it/400/300/?image=870'
        //   },
        //   {
        //     title: 'Image 6 (URL)',
        //     url: 'https://unsplash.it/400/300/?image=876'
        //   },
        // ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JlLWFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELDJFQUF3RTtBQUN4RSw0Q0FBOEM7QUFPOUM7SUFNRSwyQkFDVSxLQUFxQixFQUNyQixlQUFnQztRQURoQyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKMUMsbUJBQWMsR0FBZSxFQUFFLENBQUM7UUFNOUIsZ0NBQWdDO1FBQ2hDLE1BQU07UUFDTiw4QkFBOEI7UUFDOUIsb0RBQW9EO1FBQ3BELE9BQU87UUFDUCxNQUFNO1FBQ04sOEJBQThCO1FBQzlCLG9EQUFvRDtRQUNwRCxPQUFPO1FBQ1AsTUFBTTtRQUNOLDhCQUE4QjtRQUM5QixvREFBb0Q7UUFDcEQsT0FBTztRQUNQLEtBQUs7SUFDUCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLGdEQUFnRDtJQUNsRCxDQUFDO0lBRUQseUNBQWEsR0FBYixVQUFjLEVBQUU7UUFBaEIsaUJBcUJDO1FBcEJDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNuRCxVQUFBLEdBQUc7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDakMsSUFBSSxJQUFJLEdBQUc7d0JBQ1QsS0FBSyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYTt3QkFDckMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU87cUJBQ3RDLENBQUE7b0JBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEMsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0QseUNBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDO0lBeERVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FRaUIsdUJBQWM7WUFDSixtQ0FBZTtPQVIvQixpQkFBaUIsQ0F5RDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXpERCxJQXlEQztBQXpEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0b3JlLWFwcCcsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogYHN0b3JlLWFwcC5jb21wb25lbnQuaHRtbGAsXHJcbiAgc3R5bGVVcmxzOiBbYHN0b3JlLWFwcC5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhcHBfaWQ6IHN0cmluZztcclxuICBhcHBfZGV0YWlsczogYW55O1xyXG4gIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gIGdhbGxlcnlfaW1hZ2VzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgZ2FsbGVyeV92aXNpYmxlX2tleTogYm9vbGVhbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZVxyXG4gICkge1xyXG4gICAgLy8gdGhpcy5nYWxsZXJ5X2ltYWdlcyA9IFsgICAgICBcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgIHRpdGxlOiAnSW1hZ2UgNCAoVVJMKScsXHJcbiAgICAvLyAgICAgdXJsOiAnaHR0cHM6Ly91bnNwbGFzaC5pdC80MDAvMzAwLz9pbWFnZT04NjgnXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIHtcclxuICAgIC8vICAgICB0aXRsZTogJ0ltYWdlIDUgKFVSTCknLFxyXG4gICAgLy8gICAgIHVybDogJ2h0dHBzOi8vdW5zcGxhc2guaXQvNDAwLzMwMC8/aW1hZ2U9ODcwJ1xyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gICB7XHJcbiAgICAvLyAgICAgdGl0bGU6ICdJbWFnZSA2IChVUkwpJyxcclxuICAgIC8vICAgICB1cmw6ICdodHRwczovL3Vuc3BsYXNoLml0LzQwMC8zMDAvP2ltYWdlPTg3NidcclxuICAgIC8vICAgfSxcclxuICAgIC8vIF07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYXBwX2lkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcF9pZClcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl0pXHJcbiAgfVxyXG5cclxuICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcF9kZXRhaWxzLmFwcF9pbWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuYXBwX2RldGFpbHMuYXBwX2ltZ3MuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuYXBwX2RldGFpbHMuYnVzaW5lc3NfbmFtZSxcclxuICAgICAgICAgICAgICB1cmw6IEdsb2JhbHMuaW1nX2Jhc2VfdXJsICsgeC5hcHBfaW1nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5X2ltYWdlcy5wdXNoKGRhdGEpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdhbGxlcnlfaW1hZ2VzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcbiAgdG9nZ2xlR2FsbGVyeSgpIHtcclxuICAgIHRoaXMuZ2FsbGVyeV92aXNpYmxlX2tleSA9ICF0aGlzLmdhbGxlcnlfdmlzaWJsZV9rZXk7XHJcbiAgfVxyXG59Il19