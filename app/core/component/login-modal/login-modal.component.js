"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var forms_1 = require("@angular/forms");
var login_service_1 = require("../../services/login.service");
var application_settings_1 = require("application-settings");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var action_bar_component_1 = require("../action-bar/action-bar.component");
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var LoginModalComponent = /** @class */ (function () {
    function LoginModalComponent(page, router, formBuilder, loginService, params, modal, vcRef, actionBarComponent) {
        this.page = page;
        this.router = router;
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.params = params;
        this.modal = modal;
        this.vcRef = vcRef;
        this.actionBarComponent = actionBarComponent;
        this.processing = false;
        this.feedback = new nativescript_feedback_1.Feedback();
    }
    LoginModalComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            app_store_flag: [0],
            app_id: [0],
        });
    };
    LoginModalComponent.prototype.isFieldValid = function (field) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    };
    LoginModalComponent.prototype.displayFieldCss = function (field) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    };
    LoginModalComponent.prototype.signIn = function () {
        var _this = this;
        if (this.form.valid) {
            this.processing = true;
            this.loginService.login(this.form.value).subscribe(function (res) {
                console.log(res);
                _this.processing = false;
                application_settings_1.setBoolean("isLoggedin", true);
                if (res.email != "") {
                    application_settings_1.setString('email', res.email);
                }
                application_settings_1.setString('contact_no', res.contact_no);
                application_settings_1.setString('user_id', res.user_id.toString());
                // this.actionBarComponent.setIsLogin();
                _this.params.closeCallback(res);
            }, function (error) {
                _this.processing = false;
                console.log(error);
                _this.feedback.error({
                    title: error.error.msg,
                    backgroundColor: new color_1.Color("red"),
                    titleColor: new color_1.Color("black"),
                    position: nativescript_feedback_1.FeedbackPosition.Bottom,
                    type: nativescript_feedback_1.FeedbackType.Custom
                });
            });
        }
        else {
            this.markFormGroupTouched(this.form);
        }
    };
    LoginModalComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    LoginModalComponent.prototype.signUp = function () {
        this.params.closeCallback({ "signup": true });
    };
    LoginModalComponent.prototype.close = function () {
        this.params.closeCallback({ "close": true });
    };
    LoginModalComponent = __decorate([
        core_1.Component({
            selector: "login-modal",
            moduleId: module.id,
            templateUrl: "login-modal.component.html",
            styleUrls: ["login-modal.component.css"],
            providers: [action_bar_component_1.ActionBarComponent]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.Router,
            forms_1.FormBuilder,
            login_service_1.LoginService,
            dialogs_1.ModalDialogParams,
            dialogs_2.ModalDialogService,
            core_1.ViewContainerRef,
            action_bar_component_1.ActionBarComponent])
    ], LoginModalComponent);
    return LoginModalComponent;
}());
exports.LoginModalComponent = LoginModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxpREFBZ0Q7QUFDaEQsd0NBQW9FO0FBQ3BFLDhEQUE0RDtBQUM1RCw2REFBMkY7QUFDM0YsbUVBQTRFO0FBRTVFLG1FQUE2RTtBQUM3RSwyRUFBd0U7QUFDeEUsK0RBQWlGO0FBQ2pGLGdEQUErQztBQVMvQztJQUtJLDZCQUNZLElBQVUsRUFDVixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsTUFBeUIsRUFDekIsS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsa0JBQXNDO1FBUHRDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVZsRCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBWWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdDQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxFQUFFLENBQUMs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QUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhbGVydCwgcHJvbXB0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFNpZ25VcE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2lnbnVwLW1vZGFsL3NpZ251cC1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJhckNvbXBvbmVudCB9IGZyb20gJy4uL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWVkYmFjaywgRmVlZGJhY2tUeXBlLCBGZWVkYmFja1Bvc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mZWVkYmFja1wiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibG9naW4tbW9kYWxcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJsb2dpbi1tb2RhbC5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgcHJvdmlkZXJzOiBbQWN0aW9uQmFyQ29tcG9uZW50XVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGZvcm06IEZvcm1Hcm91cDtcclxuICAgIHByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZmVlZGJhY2s6IEZlZWRiYWNrO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBhY3Rpb25CYXJDb21wb25lbnQ6IEFjdGlvbkJhckNvbXBvbmVudFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5mZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgICAgICB1c2VybmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIGFwcF9zdG9yZV9mbGFnOiBbMF0sXHJcbiAgICAgICAgICAgIGFwcF9pZDogWzBdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmllbGRWYWxpZChmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUZpZWxkQ3NzKGZpZWxkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaXMtaW52YWxpZCc6IHRoaXMuZm9ybS5nZXQoZmllbGQpLmludmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpLFxyXG4gICAgICAgICAgICAnaXMtdmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2lnbkluKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblNlcnZpY2UubG9naW4odGhpcy5mb3JtLnZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRCb29sZWFuKFwiaXNMb2dnZWRpblwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZW1haWwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ2VtYWlsJywgcmVzLmVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ2NvbnRhY3Rfbm8nLCByZXMuY29udGFjdF9ubylcclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ3VzZXJfaWQnLCByZXMudXNlcl9pZC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWN0aW9uQmFyQ29tcG9uZW50LnNldElzTG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZGJhY2suZXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXJyb3IuZXJyb3IubXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcInJlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVDb2xvcjogbmV3IENvbG9yKFwiYmxhY2tcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBGZWVkYmFja1Bvc2l0aW9uLkJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRmVlZGJhY2tUeXBlLkN1c3RvbVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFya0Zvcm1Hcm91cFRvdWNoZWQoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgICAgICAoPGFueT5PYmplY3QpLnZhbHVlcyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goY29udHJvbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG4gICAgICAgICAgICBpZiAoY29udHJvbC5jb250cm9scykge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5jb250cm9scy5mb3JFYWNoKGMgPT4gdGhpcy5tYXJrRm9ybUdyb3VwVG91Y2hlZChjKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2lnblVwKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBcInNpZ251cFwiOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBcImNsb3NlXCI6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG59Il19