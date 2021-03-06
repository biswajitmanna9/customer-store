"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
var ActionBarComponent = /** @class */ (function () {
    function ActionBarComponent(_routerExtensions) {
        this._routerExtensions = _routerExtensions;
    }
    ActionBarComponent.prototype.ngOnInit = function () {
        this.setIsLogin();
    };
    ActionBarComponent.prototype.setIsLogin = function () {
        if (application_settings_1.getBoolean('isLoggedin')) {
            this.isLoggedin = application_settings_1.getBoolean('isLoggedin');
            // alert(this.isLoggedin)
        }
    };
    ActionBarComponent.prototype.logout = function () {
        application_settings_1.clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    ActionBarComponent.prototype.cart = function () {
    };
    ActionBarComponent = __decorate([
        core_1.Component({
            selector: "action-bar",
            moduleId: module.id,
            templateUrl: "./action-bar.component.html",
            styleUrls: ['./action-bar.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb24tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRDtBQUNqRCxzREFBK0Q7QUFDL0QsNkRBQTJGO0FBTzNGO0lBRUksNEJBQ1ksaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFHL0MsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFDSSxFQUFFLENBQUEsQ0FBQyxpQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLGlDQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MseUJBQXlCO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNJLDRCQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxpQ0FBSSxHQUFKO0lBRUEsQ0FBQztJQTFCUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7eUNBSWlDLHlCQUFnQjtPQUh0QyxrQkFBa0IsQ0EyQjlCO0lBQUQseUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztBQTNCWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImFjdGlvbi1iYXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1iYXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2FjdGlvbi1iYXIuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBpc0xvZ2dlZGluOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0SXNMb2dpbigpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNMb2dpbigpe1xyXG4gICAgICAgIGlmKGdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2dnZWRpbiA9IGdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKTtcclxuICAgICAgICAgICAgLy8gYWxlcnQodGhpcy5pc0xvZ2dlZGluKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKXtcclxuICAgICAgICBjbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=