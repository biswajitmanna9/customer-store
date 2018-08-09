"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var orientation = require('nativescript-orientation');
var application = require("tns-core-modules/application");
var router_1 = require("nativescript-angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        orientation.setOrientation("portrait");
        application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
            if (_this.router.canGoBack()) {
                args.cancel = true;
                _this.router.back();
            }
            else {
                args.cancel = false;
            }
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsMERBQTREO0FBQzVELHNEQUErRDtBQU0vRDtJQUVJLHNCQUFvQixNQUF3QjtRQUE1QyxpQkFVQztRQVZtQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQVM7WUFDdEYsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBWlEsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQUk4Qix5QkFBZ0I7T0FGbkMsWUFBWSxDQWN4QjtJQUFELG1CQUFDO0NBQUEsQUFkRCxJQWNDO0FBZFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG52YXIgb3JpZW50YXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtb3JpZW50YXRpb24nKTtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgICBvcmllbnRhdGlvbi5zZXRPcmllbnRhdGlvbihcInBvcnRyYWl0XCIpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIuY2FuR29CYWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLmJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19