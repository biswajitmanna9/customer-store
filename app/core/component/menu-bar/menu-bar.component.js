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
                console.log("ggggg");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLG1FQUE2RTtBQUM3RSw4RUFBMkU7QUFDM0UsaUZBQThFO0FBQzlFLDZEQUEyRjtBQUUzRixzREFBK0Q7QUFDL0QsMENBQTJDO0FBTzNDO0lBT0ksMEJBQ1ksS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsTUFBd0IsRUFDeEIsUUFBa0I7UUFIbEIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVY5QixZQUFPLEdBQUc7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUM7SUFTRixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHlDQUFjLEdBQWQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDJDQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNwQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7WUFDeEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDZDQUFvQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7WUFDeEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlDQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUF0RFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQVNxQiw0QkFBa0I7WUFDbEIsdUJBQWdCO1lBQ2YseUJBQWdCO1lBQ2QsaUJBQVE7T0FYckIsZ0JBQWdCLENBdUQ1QjtJQUFELHVCQUFDO0NBQUEsQUF2REQsSUF1REM7QUF2RFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q29udGFpbmVyUmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnblVwTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9zaWdudXAtbW9kYWwvc2lnbnVwLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtZW51LWJhclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWVudS1iYXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL21lbnUtYmFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudUJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgfTtcclxuICAgIGN1cnJlbnRfdXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpe1xyXG4gICAgICAgIHZhciBmdWxsX2xvY2F0aW9uID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmdWxsX2xvY2F0aW9uKVxyXG4gICAgICAgIHRoaXMuY3VycmVudF91cmwgPSBmdWxsX2xvY2F0aW9uWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Mb2dpbk1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKExvZ2luTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBpZiAocmVzLnNpZ251cCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2lnbnVwTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdnZ2dnXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb3BlblNpZ251cE1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNpZ25VcE1vZGFsQ29tcG9uZW50LCB0aGlzLm9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5zaWduaW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub2Rhc2hib2FyZCgpIHtcclxuICAgICAgICBpZiAoIWdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=