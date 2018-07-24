"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var forms_1 = require("@angular/forms");
var login_service_1 = require("../core/services/login.service");
var application_settings_1 = require("application-settings");
var router_1 = require("nativescript-angular/router");
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, router, formBuilder, loginService) {
        this.page = page;
        this.router = router;
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.processing = false;
        this.page.actionBarHidden = true;
        this.feedback = new nativescript_feedback_1.Feedback();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.isFieldValid = function (field) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    };
    LoginComponent.prototype.displayFieldCss = function (field) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    };
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        if (this.form.valid) {
            this.processing = true;
            this.loginService.login(this.form.value).subscribe(function (res) {
                console.log(res);
                _this.processing = false;
                application_settings_1.clear();
                application_settings_1.setBoolean("isLoggedin", true);
                application_settings_1.setString('email', res.email);
                application_settings_1.setString('contact_no', res.contact_no);
                application_settings_1.setString('user_id', res.user_id.toString());
                _this.router.navigate(['/']);
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
    LoginComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    LoginComponent.prototype.skip = function () {
        application_settings_1.setBoolean("isSkipped", true);
        this.router.navigate(['/']);
    };
    LoginComponent.prototype.forgotPassword = function () {
        dialogs_1.prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for Shyam Future Store to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then(function (data) {
            if (data.result) {
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            forms_1.FormBuilder,
            login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELHVEQUE0RDtBQUM1RCxpREFBZ0Q7QUFDaEQsd0NBQW9FO0FBQ3BFLGdFQUE4RDtBQUM5RCw2REFBMkY7QUFDM0Ysc0RBQStEO0FBQy9ELCtEQUFpRjtBQUNqRixnREFBK0M7QUFPL0M7SUFJRSx3QkFDVSxJQUFVLEVBQ1YsTUFBd0IsRUFDeEIsV0FBd0IsRUFDeEIsWUFBMEI7UUFIMUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTnBDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFRakIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQ0FBUSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxLQUFhO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFB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QUFDLElBQUksT0FBQSxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztZQUM5RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkJBQUksR0FBSjtRQUNFLGlDQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBR0QsdUNBQWMsR0FBZDtRQUNFLGdCQUFNLENBQUM7WUFDTCxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSw2RkFBNkY7WUFDdEcsU0FBUyxFQUFFLE9BQU87WUFDbEIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFbEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQS9GVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQU1nQixXQUFJO1lBQ0YseUJBQWdCO1lBQ1gsbUJBQVc7WUFDViw0QkFBWTtPQVJ6QixjQUFjLENBaUcxQjtJQUFELHFCQUFDO0NBQUEsQUFqR0QsSUFpR0M7QUFqR1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgYWxlcnQsIHByb21wdCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvcmUvc2VydmljZXMvbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmVlZGJhY2ssIEZlZWRiYWNrVHlwZSwgRmVlZGJhY2tQb3NpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmVlZGJhY2tcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJsb2dpblwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGZvcm06IEZvcm1Hcm91cDtcclxuICBwcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBmZWVkYmFjazogRmVlZGJhY2s7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICB0aGlzLmZlZWRiYWNrID0gbmV3IEZlZWRiYWNrKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB1c2VybmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBpc0ZpZWxkVmFsaWQoZmllbGQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuICF0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZCk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RmllbGRDc3MoZmllbGQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2lzLWludmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS5pbnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKSxcclxuICAgICAgJ2lzLXZhbGlkJzogdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBzaWduSW4oKSB7ICAgIFxyXG4gICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xyXG4gICAgICB0aGlzLnByb2Nlc3NpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmxvZ2luU2VydmljZS5sb2dpbih0aGlzLmZvcm0udmFsdWUpLnN1YnNjcmliZShcclxuICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjbGVhcigpO1xyXG4gICAgICAgICAgc2V0Qm9vbGVhbihcImlzTG9nZ2VkaW5cIiwgdHJ1ZSlcclxuICAgICAgICAgIHNldFN0cmluZygnZW1haWwnLCByZXMuZW1haWwpXHJcbiAgICAgICAgICBzZXRTdHJpbmcoJ2NvbnRhY3Rfbm8nLCByZXMuY29udGFjdF9ubylcclxuICAgICAgICAgIHNldFN0cmluZygndXNlcl9pZCcsIHJlcy51c2VyX2lkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSkgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgdGhpcy5mZWVkYmFjay5lcnJvcih7XHJcbiAgICAgICAgICAgIHRpdGxlOiBlcnJvci5lcnJvci5tc2csXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwicmVkXCIpLFxyXG4gICAgICAgICAgICB0aXRsZUNvbG9yOiBuZXcgQ29sb3IoXCJibGFja1wiKSxcclxuICAgICAgICAgICAgcG9zaXRpb246IEZlZWRiYWNrUG9zaXRpb24uQm90dG9tLFxyXG4gICAgICAgICAgICB0eXBlOiBGZWVkYmFja1R5cGUuQ3VzdG9tXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1hcmtGb3JtR3JvdXBUb3VjaGVkKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICAoPGFueT5PYmplY3QpLnZhbHVlcyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goY29udHJvbCA9PiB7XHJcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG4gICAgICBpZiAoY29udHJvbC5jb250cm9scykge1xyXG4gICAgICAgIGNvbnRyb2wuY29udHJvbHMuZm9yRWFjaChjID0+IHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQoYykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNraXAoKSB7XHJcbiAgICBzZXRCb29sZWFuKFwiaXNTa2lwcGVkXCIsIHRydWUpXHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSkgICAgXHJcbiAgfVxyXG5cclxuXHJcbiAgZm9yZ290UGFzc3dvcmQoKSB7XHJcbiAgICBwcm9tcHQoe1xyXG4gICAgICB0aXRsZTogXCJGb3Jnb3QgUGFzc3dvcmRcIixcclxuICAgICAgbWVzc2FnZTogXCJFbnRlciB0aGUgZW1haWwgYWRkcmVzcyB5b3UgdXNlZCB0byByZWdpc3RlciBmb3IgU2h5YW0gRnV0dXJlIFN0b3JlIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQuXCIsXHJcbiAgICAgIGlucHV0VHlwZTogXCJlbWFpbFwiLFxyXG4gICAgICBkZWZhdWx0VGV4dDogXCJcIixcclxuICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCIsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XHJcblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59Il19