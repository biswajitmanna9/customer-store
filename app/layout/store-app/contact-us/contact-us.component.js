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
            _this.app_details = res;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC11cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LXVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDhFQUEyRTtBQUMzRSw2Q0FBK0M7QUFDL0MsMENBQXlDO0FBT3pDO0lBSUksb0NBQ1ksS0FBcUIsRUFDckIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMsTUFBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFHMUIsQ0FBQztJQUNELDZDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBR0Qsa0RBQWEsR0FBYixVQUFjLEVBQUU7UUFBaEIsaUJBV0M7UUFWRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFFRCw0Q0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFRCx5Q0FBSSxHQUFKLFVBQUssTUFBTTtRQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUF0Q1EsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU1xQix1QkFBYztZQUNYLGlCQUFRO1lBQ0QsbUNBQWU7WUFDeEIsZUFBTTtPQVJqQiwwQkFBMEIsQ0FtRHRDO0lBQUQsaUNBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBUTlNQaG9uZSBmcm9tICduYXRpdmVzY3JpcHQtcGhvbmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb250YWN0LXVzJyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogYGNvbnRhY3QtdXMuY29tcG9uZW50Lmh0bWxgLFxyXG4gICAgc3R5bGVVcmxzOiBbYGNvbnRhY3QtdXMuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcENvbnRhY3RVc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBhcHBfaWQ6IHN0cmluZztcclxuICAgIGFwcF9kZXRhaWxzOiBhbnk7XHJcbiAgICB2aXNpYmxlX2tleTogYm9vbGVhblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBfaWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIG1hc3NhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RvcmUtYXBwLycsIHRoaXMuYXBwX2lkICwgJ21lc3NlbmdlciddKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGwobW9iaWxlKSB7XHJcbiAgICAgICAgVE5TUGhvbmUuZGlhbChtb2JpbGUudG9TdHJpbmcoKSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGV4dCBhIG51bWJlciAob3IgbXVsdGlwbGUgbnVtYmVycylcclxuICAgIC8vIHB1YmxpYyBtZXNzYWdlUGFyZW50cygpIHtcclxuICAgIC8vICAgICBUTlNQaG9uZS5zbXMoWycyMTItNTU1LTEyMzQnLCAnMjEyLTU1NS0wOTg3J10sIFwiVGV4dCB0aWxsIHlvdXIgZmluZ2VycyBibGVlZFwiKVxyXG4gICAgLy8gICAgICAgICAudGhlbihcclxuICAgIC8vICAgICAgICAgICAgIChhcmdzKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIClcclxuICAgIC8vIH1cclxufSJdfQ==