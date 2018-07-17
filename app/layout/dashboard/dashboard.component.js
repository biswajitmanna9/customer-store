"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var explore_service_1 = require("../../core/services/explore.service");
var application_settings_1 = require("application-settings");
var Globals = require("../../core/globals");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(exploreService) {
        this.exploreService = exploreService;
        this.user_app_list = [];
        this.base_url = Globals.img_base_url;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.user_id = application_settings_1.getString('user_id');
        this.getDashboardAppList();
    };
    DashboardComponent.prototype.getDashboardAppList = function () {
        var _this = this;
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(function (res) {
            _this.user_app_list = res['app_master'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMEVBQXdFO0FBQ3hFLCtEQUFpRDtBQUNqRCxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsZ0NBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztBQUU1Qyx1RUFBcUU7QUFDckUsNkRBQTJGO0FBQzNGLDRDQUE4QztBQU85QztJQUlJLDRCQUNZLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUgxQyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVcsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUt4QyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0RBQW1CLEdBQW5CO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQy9ELFVBQUEsR0FBRztZQUNDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBekJRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDM0MsQ0FBQzt5Q0FNOEIsZ0NBQWM7T0FMakMsa0JBQWtCLENBMEI5QjtJQUFELHlCQUFDO0NBQUEsQUExQkQsSUEwQkM7QUExQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XHJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhcmR2aWV3JztcclxucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcclxuXHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxzIGZyb20gJy4uLy4uL2NvcmUvZ2xvYmFscyc7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiZGFzaGJvYXJkXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyX2lkOiBzdHJpbmc7XHJcbiAgICB1c2VyX2FwcF9saXN0OiBhbnkgPSBbXTtcclxuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBHbG9iYWxzLmltZ19iYXNlX3VybDtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICAgICAgdGhpcy5nZXREYXNoYm9hcmRBcHBMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGFzaGJvYXJkQXBwTGlzdCgpIHtcclxuICAgICAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldFVzZXJEYXNoYm9hcmRBcHBMaXN0KHRoaXMudXNlcl9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyX2FwcF9saXN0ID0gcmVzWydhcHBfbWFzdGVyJ11cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59Il19