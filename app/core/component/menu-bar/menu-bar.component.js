"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var login_modal_component_1 = require("../login-modal/login-modal.component");
var signup_modal_component_1 = require("../signup-modal/signup-modal.component");
var application_settings_1 = require("application-settings");
var router_1 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var MenuBarComponent = /** @class */ (function () {
    function MenuBarComponent(modal, vcRef, router, location) {
        this.modal = modal;
        this.vcRef = vcRef;
        this.router = router;
        this.location = location;
        this.options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
    }
    MenuBarComponent.prototype.ngOnInit = function () {
        var full_location = this.location.path().split('/');
        console.log(full_location);
        this.current_url = full_location[1];
    };
    MenuBarComponent.prototype.openLoginModal = function () {
        var _this = this;
        this.modal.showModal(login_modal_component_1.LoginModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res.signup) {
                _this.openSignupModal();
            }
            else if (res.success == 1) {
                // console.log(getBoolean('isLoggedin'))
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    MenuBarComponent.prototype.openSignupModal = function () {
        var _this = this;
        this.modal.showModal(signup_modal_component_1.SignUpModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res.signin) {
                _this.openLoginModal();
            }
            else if (res.success == 1) {
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    MenuBarComponent.prototype.goTodashboard = function () {
        if (!application_settings_1.getBoolean('isLoggedin')) {
            this.openLoginModal();
        }
        else {
            this.router.navigate(['/dashboard']);
        }
    };
    MenuBarComponent = __decorate([
        core_1.Component({
            selector: "menu-bar",
            moduleId: module.id,
            templateUrl: "./menu-bar.component.html",
            styleUrls: ['./menu-bar.component.css']
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            router_1.RouterExtensions,
            common_1.Location])
    ], MenuBarComponent);
    return MenuBarComponent;
}());
exports.MenuBarComponent = MenuBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLG1FQUE2RTtBQUM3RSw4RUFBMkU7QUFDM0UsaUZBQThFO0FBQzlFLDZEQUEyRjtBQUUzRixzREFBK0Q7QUFDL0QsMENBQTJDO0FBTzNDO0lBT0ksMEJBQ1ksS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsTUFBd0IsRUFDeEIsUUFBa0I7UUFIbEIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVY5QixZQUFPLEdBQUc7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7SUFTRixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHlDQUFjLEdBQWQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDJDQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4Qix3Q0FBd0M7Z0JBQ3hDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsNkNBQW9CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsd0NBQWEsR0FBYjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQXREUSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBU3FCLDRCQUFrQjtZQUNsQix1QkFBZ0I7WUFDZix5QkFBZ0I7WUFDZCxpQkFBUTtPQVhyQixnQkFBZ0IsQ0F1RDVCO0lBQUQsdUJBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduVXBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL3NpZ251cC1tb2RhbC9zaWdudXAtbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1lbnUtYmFyXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tZW51LWJhci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbWVudS1iYXIuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgY3VycmVudF91cmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdmFyIGZ1bGxfbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZ1bGxfbG9jYXRpb24pXHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3VybCA9IGZ1bGxfbG9jYXRpb25bMV07XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkxvZ2luTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTG9naW5Nb2RhbENvbXBvbmVudCwgdGhpcy5vcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc2lnbnVwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5TaWdudXBNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlcy5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvcGVuU2lnbnVwTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2lnblVwTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBpZiAocmVzLnNpZ25pbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTG9naW5Nb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlcy5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnb1RvZGFzaGJvYXJkKCkge1xyXG4gICAgICAgIGlmICghZ2V0Qm9vbGVhbignaXNMb2dnZWRpbicpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==