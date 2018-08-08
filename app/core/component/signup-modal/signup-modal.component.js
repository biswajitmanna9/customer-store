"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var forms_1 = require("@angular/forms");
var login_service_1 = require("../../services/login.service");
var application_settings_1 = require("application-settings");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var action_bar_component_1 = require("../action-bar/action-bar.component");
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var SignUpModalComponent = /** @class */ (function () {
    function SignUpModalComponent(page, router, formBuilder, loginService, params, actionBarComponent) {
        this.page = page;
        this.router = router;
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.params = params;
        this.actionBarComponent = actionBarComponent;
        this.processing = false;
        this.feedback = new nativescript_feedback_1.Feedback();
    }
    SignUpModalComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            customer_name: ['', forms_1.Validators.required],
            email: ['', [
                    forms_1.Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                ]],
            contact_no: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(10),
                    forms_1.Validators.maxLength(12)
                ]],
            password: ['', forms_1.Validators.required]
        });
    };
    SignUpModalComponent.prototype.isFieldValid = function (field) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    };
    SignUpModalComponent.prototype.displayFieldCss = function (field) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    };
    SignUpModalComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    SignUpModalComponent.prototype.signUp = function () {
        var _this = this;
        if (this.form.valid) {
            this.processing = true;
            this.loginService.signup(this.form.value).subscribe(function (res) {
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
    SignUpModalComponent.prototype.signIn = function () {
        this.params.closeCallback({ "signin": true });
    };
    SignUpModalComponent.prototype.close = function () {
        this.params.closeCallback({ "close": true });
    };
    SignUpModalComponent = __decorate([
        core_1.Component({
            selector: "signup-modal",
            moduleId: module.id,
            templateUrl: "signup-modal.component.html",
            styleUrls: ["signup-modal.component.css"],
            providers: [action_bar_component_1.ActionBarComponent]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.Router,
            forms_1.FormBuilder,
            login_service_1.LoginService,
            dialogs_1.ModalDialogParams,
            action_bar_component_1.ActionBarComponent])
    ], SignUpModalComponent);
    return SignUpModalComponent;
}());
exports.SignUpModalComponent = SignUpModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBRXpDLGlEQUFnRDtBQUNoRCx3Q0FBb0U7QUFDcEUsOERBQTREO0FBQzVELDZEQUEyRjtBQUMzRixtRUFBNEU7QUFDNUUsMkVBQXdFO0FBQ3hFLCtEQUFpRjtBQUNqRixnREFBK0M7QUFTL0M7SUFLSSw4QkFDWSxJQUFVLEVBQ1YsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLE1BQXlCLEVBQ3pCLGtCQUFzQztRQUx0QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFSbEQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVVmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQ0FBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQy9CLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUN4QyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ1Isa0JBQVUsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUM7aUJBQzFFLENBQUM7WUFDRixVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2Isa0JBQVUsQ0FBQyxRQUFRO29CQUNuQixrQkFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3hCLGtCQUFVLENBQUMsU0FB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QixDQTZGaEM7SUFBRCwyQkFBQztDQUFBLEFBN0ZELElBNkZDO0FBN0ZZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhbGVydCwgcHJvbXB0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJhckNvbXBvbmVudCB9IGZyb20gJy4uL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWVkYmFjaywgRmVlZGJhY2tUeXBlLCBGZWVkYmFja1Bvc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mZWVkYmFja1wiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwic2lnbnVwLW1vZGFsXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwic2lnbnVwLW1vZGFsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInNpZ251cC1tb2RhbC5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgcHJvdmlkZXJzOiBbQWN0aW9uQmFyQ29tcG9uZW50XVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25VcE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgICBwcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGZlZWRiYWNrOiBGZWVkYmFjaztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgICAgIHByaXZhdGUgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxyXG4gICAgICAgIHByaXZhdGUgYWN0aW9uQmFyQ29tcG9uZW50OiBBY3Rpb25CYXJDb21wb25lbnRcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZmVlZGJhY2sgPSBuZXcgRmVlZGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgY3VzdG9tZXJfbmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgZW1haWw6IFsnJywgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eW2EtekEtWjAtOS5fJSstXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aXXsyLDR9JC8pXHJcbiAgICAgICAgICAgIF1dLFxyXG4gICAgICAgICAgICBjb250YWN0X25vOiBbJycsIFtcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgxMCksXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgxMilcclxuICAgICAgICAgICAgXV0sXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGaWVsZFZhbGlkKGZpZWxkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuZm9ybS5nZXQoZmllbGQpLnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5RmllbGRDc3MoZmllbGQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdpcy1pbnZhbGlkJzogdGhpcy5mb3JtLmdldChmaWVsZCkuaW52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZCksXHJcbiAgICAgICAgICAgICdpcy12YWxpZCc6IHRoaXMuZm9ybS5nZXQoZmllbGQpLnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbWFya0Zvcm1Hcm91cFRvdWNoZWQoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgICAgICAoPGFueT5PYmplY3QpLnZhbHVlcyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goY29udHJvbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG4gICAgICAgICAgICBpZiAoY29udHJvbC5jb250cm9scykge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5jb250cm9scy5mb3JFYWNoKGMgPT4gdGhpcy5tYXJrRm9ybUdyb3VwVG91Y2hlZChjKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduVXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luU2VydmljZS5zaWdudXAodGhpcy5mb3JtLnZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRCb29sZWFuKFwiaXNMb2dnZWRpblwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZW1haWwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ2VtYWlsJywgcmVzLmVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ2NvbnRhY3Rfbm8nLCByZXMuY29udGFjdF9ubylcclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoJ3VzZXJfaWQnLCByZXMudXNlcl9pZC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWN0aW9uQmFyQ29tcG9uZW50LnNldElzTG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVlZGJhY2suZXJyb3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXJyb3IuZXJyb3IubXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcInJlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVDb2xvcjogbmV3IENvbG9yKFwiYmxhY2tcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBGZWVkYmFja1Bvc2l0aW9uLkJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRmVlZGJhY2tUeXBlLkN1c3RvbVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBcInNpZ25pblwiOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBcImNsb3NlXCI6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG59Il19