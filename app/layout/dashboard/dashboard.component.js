"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var explore_service_1 = require("../../core/services/explore.service");
var application_settings_1 = require("application-settings");
var Globals = require("../../core/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(exploreService) {
        this.exploreService = exploreService;
        this.user_app_list = [];
        this.base_url = Globals.img_base_url;
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
    DashboardComponent.prototype.ngOnInit = function () {
        this.user_id = application_settings_1.getString('user_id');
        this.getDashboardAppList();
    };
    DashboardComponent.prototype.getDashboardAppList = function () {
        var _this = this;
        this.loader.show(this.lodaing_options);
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(function (res) {
            _this.user_app_list = res['app_master'];
            console.log(res);
            _this.loader.hide();
        }, function (error) {
            _this.loader.hide();
            console.log(error);
        });
    };
    DashboardComponent.prototype.removeFromDashboard = function (app_id) {
        var _this = this;
        var data = {
            "customer": this.user_id,
            "app_master": app_id
        };
        this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(function (res) {
            _this.getDashboardAppList();
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "dashboard",
            moduleId: module.id,
            templateUrl: "./dashboard.component.html",
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [explore_service_1.ExploreService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMEVBQXdFO0FBQ3hFLCtEQUFpRDtBQUNqRCxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsZ0NBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztBQUU1Qyx1RUFBcUU7QUFDckUsNkRBQTJGO0FBQzNGLDRDQUE4QztBQUM5QyxpRkFBa0U7QUFPbEU7SUE0QkksNEJBQ1ksY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBM0IxQyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxXQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUc7WUFDZCxPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRTtnQkFDTCxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGNBQWMsRUFBRSxVQUFVLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUN0RSxHQUFHLEVBQUUsR0FBRztnQkFDUixvQkFBb0IsRUFBRSxTQUFTO2dCQUMvQixxQkFBcUIsRUFBRSxJQUFJO2dCQUMzQixhQUFhLEVBQUUsQ0FBQztnQkFDaEIsaUJBQWlCLEVBQUUsQ0FBQzthQUN2QjtZQUNELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLGVBQWUsRUFBRSxRQUFRO2dCQUN6QixzQkFBc0IsRUFBRSxLQUFLO2dCQUM3QixTQUFTLEVBQUUsSUFBSTthQUNsQjtTQUNKLENBQUE7SUFLRCxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0RBQW1CLEdBQW5CO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUMvRCxVQUFBLEdBQUc7WUFDQyxLQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFHRCxnREFBbUIsR0FBbkIsVUFBb0IsTUFBTTtRQUExQixpQkFjQztRQWJHLElBQUksSUFBSSxHQUFHO1lBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3hCLFlBQVksRUFBRSxNQUFNO1NBQ3ZCLENBQUE7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDaEUsVUFBQSxHQUFHO1lBQ0MsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFyRVEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDO3lDQThCOEIsZ0NBQWM7T0E3QmpDLGtCQUFrQixDQXNFOUI7SUFBRCx5QkFBQztDQUFBLEFBdEVELElBc0VDO0FBdEVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnQ2FyZFZpZXcnLCAoKSA9PiBDYXJkVmlldyk7XHJcblxyXG5pbXBvcnQgeyBFeHBsb3JlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL2V4cGxvcmUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFscyBmcm9tICcuLi8uLi9jb3JlL2dsb2JhbHMnO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImRhc2hib2FyZFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcl9pZDogc3RyaW5nO1xyXG4gICAgdXNlcl9hcHBfbGlzdDogYW55ID0gW107XHJcbiAgICBiYXNlX3VybDogc3RyaW5nID0gR2xvYmFscy5pbWdfYmFzZV91cmw7XHJcbiAgICBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG4gICAgbG9kYWluZ19vcHRpb25zID0ge1xyXG4gICAgICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBwcm9ncmVzczogMC42NSxcclxuICAgICAgICBhbmRyb2lkOiB7XHJcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24gKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgICAgICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlvczoge1xyXG4gICAgICAgICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIixcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgaGlkZUJlemVsOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICAgICAgdGhpcy5nZXREYXNoYm9hcmRBcHBMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFzaGJvYXJkQXBwTGlzdCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRlci5zaG93KHRoaXMubG9kYWluZ19vcHRpb25zKTtcclxuICAgICAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldFVzZXJEYXNoYm9hcmRBcHBMaXN0KHRoaXMudXNlcl9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyX2FwcF9saXN0ID0gcmVzWydhcHBfbWFzdGVyJ11cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW1vdmVGcm9tRGFzaGJvYXJkKGFwcF9pZCkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBcImN1c3RvbWVyXCI6IHRoaXMudXNlcl9pZCxcclxuICAgICAgICAgICAgXCJhcHBfbWFzdGVyXCI6IGFwcF9pZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmFwcEF0dGFjaEFuZERpc2F0dGFjaFRvRGFzaGJvYXJkKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGFzaGJvYXJkQXBwTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSJdfQ==