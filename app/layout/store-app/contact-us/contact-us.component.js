"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var store_app_service_1 = require("../../../core/services/store-app.service");
var TNSPhone = require("nativescript-phone");
var router_2 = require("@angular/router");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var StoreAppContactUsComponent = /** @class */ (function () {
    function StoreAppContactUsComponent(route, location, storeAppService, router) {
        this.route = route;
        this.location = location;
        this.storeAppService = storeAppService;
        this.router = router;
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
    StoreAppContactUsComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.getAppDetails(this.app_id);
    };
    StoreAppContactUsComponent.prototype.getAppDetails = function (id) {
        var _this = this;
        this.loader.show(this.lodaing_options);
        this.storeAppService.getStoreAppDetails(id).subscribe(function (res) {
            _this.app_details = res;
            _this.visible_key = true;
            console.log(res);
            _this.loader.hide();
        }, function (error) {
            _this.loader.hide();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC11cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LXVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsMENBQTJDO0FBQzNDLDhFQUEyRTtBQUMzRSw2Q0FBK0M7QUFDL0MsMENBQXlDO0FBQ3pDLGlGQUFrRTtBQU9sRTtJQTRCSSxvQ0FDWSxLQUFxQixFQUNyQixRQUFrQixFQUNsQixlQUFnQyxFQUNoQyxNQUFjO1FBSGQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQTVCMUIsV0FBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztRQUNwQyxvQkFBZSxHQUFHO1lBQ2xCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsS0FBSztnQkFDakIsY0FBYyxFQUFFLFVBQVUsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxDQUFDLENBQUM7Z0JBQ3RFLEdBQUcsRUFBRSxHQUFHO2dCQUNSLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixpQkFBaUIsRUFBRSxDQUFDO2FBQ3JCO1lBQ0QsR0FBRyxFQUFFO2dCQUNILE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE1BQU0sRUFBRSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsZUFBZSxFQUFFLFFBQVE7Z0JBQ3pCLHNCQUFzQixFQUFFLEtBQUs7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1NBQ0EsQ0FBQTtJQVFHLENBQUM7SUFDRCw2Q0FBUSxHQUFSO1FBQ0ksSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUdELGtEQUFhLEdBQWIsVUFBYyxFQUFFO1FBQWhCLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNqRCxVQUFBLEdBQUc7WUFDQyxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFFRCw0Q0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFRCx5Q0FBSSxHQUFKLFVBQUssTUFBTTtRQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFqRVEsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQThCcUIsdUJBQWM7WUFDWCxpQkFBUTtZQUNELG1DQUFlO1lBQ3hCLGVBQU07T0FoQ2pCLDBCQUEwQixDQThFdEM7SUFBRCxpQ0FBQztDQUFBLEFBOUVELElBOEVDO0FBOUVZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIFROU1Bob25lIGZyb20gJ25hdGl2ZXNjcmlwdC1waG9uZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnRhY3QtdXMnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgY29udGFjdC11cy5jb21wb25lbnQuaHRtbGAsXHJcbiAgICBzdHlsZVVybHM6IFtgY29udGFjdC11cy5jb21wb25lbnQuY3NzYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwQ29udGFjdFVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgYXBwX2RldGFpbHM6IGFueTtcclxuICAgIHZpc2libGVfa2V5OiBib29sZWFuO1xyXG4gICAgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxubG9kYWluZ19vcHRpb25zID0ge1xyXG5tZXNzYWdlOiAnTG9hZGluZy4uLicsXHJcbnByb2dyZXNzOiAwLjY1LFxyXG5hbmRyb2lkOiB7XHJcbiAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcclxuICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24gKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgbWF4OiAxMDAsXHJcbiAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gIHNlY29uZGFyeVByb2dyZXNzOiAxXHJcbn0sXHJcbmlvczoge1xyXG4gIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICBtYXJnaW46IDEwLFxyXG4gIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgY29sb3I6IFwiIzRCOUVENlwiLFxyXG4gIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcclxuICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSxcclxuICBoaWRlQmV6ZWw6IHRydWUsXHJcbn1cclxufVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yZUFwcFNlcnZpY2U6IFN0b3JlQXBwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZnVsbF9sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdGhpcy5hcHBfaWQgPSBmdWxsX2xvY2F0aW9uWzJdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLmdldEFwcERldGFpbHModGhpcy5hcHBfaWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRBcHBEZXRhaWxzKGlkKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLmxvZGFpbmdfb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zdG9yZUFwcFNlcnZpY2UuZ2V0U3RvcmVBcHBEZXRhaWxzKGlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcF9kZXRhaWxzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlX2tleSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIG1hc3NhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RvcmUtYXBwLycsIHRoaXMuYXBwX2lkICwgJ21lc3NlbmdlciddKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGwobW9iaWxlKSB7XHJcbiAgICAgICAgVE5TUGhvbmUuZGlhbChtb2JpbGUudG9TdHJpbmcoKSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGV4dCBhIG51bWJlciAob3IgbXVsdGlwbGUgbnVtYmVycylcclxuICAgIC8vIHB1YmxpYyBtZXNzYWdlUGFyZW50cygpIHtcclxuICAgIC8vICAgICBUTlNQaG9uZS5zbXMoWycyMTItNTU1LTEyMzQnLCAnMjEyLTU1NS0wOTg3J10sIFwiVGV4dCB0aWxsIHlvdXIgZmluZ2VycyBibGVlZFwiKVxyXG4gICAgLy8gICAgICAgICAudGhlbihcclxuICAgIC8vICAgICAgICAgICAgIChhcmdzKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIClcclxuICAgIC8vIH1cclxufSJdfQ==