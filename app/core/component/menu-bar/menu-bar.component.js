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
            if (res != undefined) {
                if (res.signup) {
                    _this.openSignupModal();
                }
                else if (res.success == 1) {
                    console.log("ggggg");
                    _this.router.navigate(['/dashboard']);
                }
            }
        });
    };
    MenuBarComponent.prototype.openSignupModal = function () {
        var _this = this;
        this.modal.showModal(signup_modal_component_1.SignUpModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res != undefined) {
                if (res.signin) {
                    _this.openLoginModal();
                }
                else if (res.success == 1) {
                    _this.router.navigate(['/dashboard']);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLG1FQUE2RTtBQUM3RSw4RUFBMkU7QUFDM0UsaUZBQThFO0FBQzlFLDZEQUEyRjtBQUUzRixzREFBK0Q7QUFDL0QsMENBQTJDO0FBTzNDO0lBT0ksMEJBQ1ksS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsTUFBd0IsRUFDeEIsUUFBa0I7UUFIbEIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVY5QixZQUFPLEdBQUc7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7SUFTRixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHlDQUFjLEdBQWQ7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDJDQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNiLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNwQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsNkNBQW9CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMxQixDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtnQkFDeEMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxpQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0lBM0RRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FTcUIsNEJBQWtCO1lBQ2xCLHVCQUFnQjtZQUNmLHlCQUFnQjtZQUNkLGlCQUFRO09BWHJCLGdCQUFnQixDQTRENUI7SUFBRCx1QkFBQztDQUFBLEFBNURELElBNERDO0FBNURZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZ25VcE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2lnbnVwLW1vZGFsL3NpZ251cC1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWVudS1iYXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21lbnUtYmFyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9tZW51LWJhci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnVCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgY3VycmVudF91cmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmdWxsX2xvY2F0aW9uKVxyXG4gICAgICAgIHRoaXMuY3VycmVudF91cmwgPSBmdWxsX2xvY2F0aW9uWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Mb2dpbk1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKExvZ2luTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBpZiAocmVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5zaWdudXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5TaWdudXBNb2RhbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2dnZ2dcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5TaWdudXBNb2RhbCgpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTaWduVXBNb2RhbENvbXBvbmVudCwgdGhpcy5vcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLnNpZ25pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlcy5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub2Rhc2hib2FyZCgpIHtcclxuICAgICAgICBpZiAoIWdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=