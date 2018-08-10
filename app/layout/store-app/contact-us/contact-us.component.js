"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var store_app_service_1 = require("../../../core/services/store-app.service");
var TNSPhone = require("nativescript-phone");
var router_2 = require("@angular/router");
var StoreAppContactUsComponent = /** @class */ (function () {
    function StoreAppContactUsComponent(route, location, storeAppService, router) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
    }
    StoreAppContactUsComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    };
    StoreAppContactUsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_owner_details = res;
            _this.visible_key = true;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    StoreAppContactUsComponent.prototype.massage = function () {
        this.router.navigate(['/store-app/', this.app_id, 'messenger']);
    };
    StoreAppContactUsComponent.prototype.call = function (mobile) {
        TNSPhone.dial(mobile.toString(), true);
    };
    StoreAppContactUsComponent = __decorate([
        core_1.Component({
            selector: 'contact-us',
            moduleId: module.id,
            templateUrl: "contact-us.component.html",
            styleUrls: ["contact-us.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            store_app_service_1.StoreAppService,
            router_2.Router])
    ], StoreAppContactUsComponent);
    return StoreAppContactUsComponent;
}());
exports.StoreAppContactUsComponent = StoreAppContactUsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC11cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LXVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDhFQUEyRTtBQUMzRSw2Q0FBK0M7QUFDL0MsMENBQXlDO0FBT3pDO0lBSUksb0NBQ1ksS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFHMUIsQ0FBQztJQUNELDZDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBR0Qsa0RBQWEsR0FBYixVQUFjLEVBQUU7UUFBaEIsaUJBV0M7UUFWRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztZQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVELDRDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUVELHlDQUFJLEdBQUosVUFBSyxNQUFNO1FBQ1AsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQXRDUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBTXFCLHVCQUFjO1lBQ1gsaUJBQVE7WUFDRCxtQ0FBZTtZQUN4QixlQUFNO09BUmpCLDBCQUEwQixDQW1EdEM7SUFBRCxpQ0FBQztDQUFBLEFBbkRELElBbURDO0FBbkRZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIFROU1Bob25lIGZyb20gJ25hdGl2ZXNjcmlwdC1waG9uZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnRhY3QtdXMnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgY29udGFjdC11cy5jb21wb25lbnQuaHRtbGAsXHJcbiAgICBzdHlsZVVybHM6IFtgY29udGFjdC11cy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQ29udGFjdFVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgYXBwX293bmVyX2RldGFpbHM6IGFueTtcclxuICAgIHZpc2libGVfa2V5OiBib29sZWFuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICAgICBwcml2YXRlIHN0b3JlQXBwU2VydmljZTogU3RvcmVBcHBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgICAgIHRoaXMuZ2V0QXBwRGV0YWlscyh0aGlzLmFwcF9pZCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEFwcERldGFpbHMoaWQpIHtcclxuICAgICAgICB0aGlzLnN0b3JlQXBwU2VydmljZS5nZXRTdG9yZUFwcERldGFpbHMoaWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwX293bmVyX2RldGFpbHMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVfa2V5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgbWFzc2FnZSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdG9yZS1hcHAvJywgdGhpcy5hcHBfaWQgLCAnbWVzc2VuZ2VyJ10pXHJcbiAgICB9XHJcblxyXG4gICAgY2FsbChtb2JpbGUpIHtcclxuICAgICAgICBUTlNQaG9uZS5kaWFsKG1vYmlsZS50b1N0cmluZygpLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZXh0IGEgbnVtYmVyIChvciBtdWx0aXBsZSBudW1iZXJzKVxyXG4gICAgLy8gcHVibGljIG1lc3NhZ2VQYXJlbnRzKCkge1xyXG4gICAgLy8gICAgIFROU1Bob25lLnNtcyhbJzIxMi01NTUtMTIzNCcsICcyMTItNTU1LTA5ODcnXSwgXCJUZXh0IHRpbGwgeW91ciBmaW5nZXJzIGJsZWVkXCIpXHJcbiAgICAvLyAgICAgICAgIC50aGVuKFxyXG4gICAgLy8gICAgICAgICAgICAgKGFyZ3MpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gfVxyXG59Il19