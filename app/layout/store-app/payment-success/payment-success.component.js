"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var application_settings_1 = require("application-settings");
var StoreAppPaymentSuccessComponent = /** @class */ (function () {
    function StoreAppPaymentSuccessComponent(route, location) {
        this.route = route;
        this.location = location;
    }
    StoreAppPaymentSuccessComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        this.app_id = full_location[2].trim();
        this.order_id = full_location[4].trim();
        this.user_id = application_settings_1.getString('user_id');
        console.log(this.order_id);
    };
    StoreAppPaymentSuccessComponent = __decorate([
        core_1.Component({
            selector: '',
            moduleId: module.id,
            templateUrl: "payment-success.component.html",
            styleUrls: ["payment-success.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location])
    ], StoreAppPaymentSuccessComponent);
    return StoreAppPaymentSuccessComponent;
}());
exports.StoreAppPaymentSuccessComponent = StoreAppPaymentSuccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1zdWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBheW1lbnQtc3VjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELDBDQUEyQztBQUMzQyw2REFBMkY7QUFPM0Y7SUFJSSx5Q0FDWSxLQUFxQixFQUNyQixRQUFrQjtRQURsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBRzlCLENBQUM7SUFFRCxrREFBUSxHQUFSO1FBQ0ksSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFqQlEsK0JBQStCO1FBTjNDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBTXFCLHVCQUFjO1lBQ1gsaUJBQVE7T0FOckIsK0JBQStCLENBa0IzQztJQUFELHNDQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksMEVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICcnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBgcGF5bWVudC1zdWNjZXNzLmNvbXBvbmVudC5odG1sYCxcclxuICAgIHN0eWxlVXJsczogW2BwYXltZW50LXN1Y2Nlc3MuY29tcG9uZW50LmNzc2BdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcFBheW1lbnRTdWNjZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGFwcF9pZDogc3RyaW5nO1xyXG4gICAgb3JkZXJfaWQ6IHN0cmluZztcclxuICAgIHVzZXJfaWQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICB0aGlzLmFwcF9pZCA9IGZ1bGxfbG9jYXRpb25bMl0udHJpbSgpO1xyXG4gICAgICAgIHRoaXMub3JkZXJfaWQgPSBmdWxsX2xvY2F0aW9uWzRdLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyX2lkKVxyXG4gICAgfVxyXG59Il19