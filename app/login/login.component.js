"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var forms_1 = require("@angular/forms");
var login_service_1 = require("../core/services/login.service");
var application_settings_1 = require("application-settings");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, router, formBuilder, loginService) {
        this.page = page;
        this.router = router;
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.isLoggingIn = true;
        this.processing = false;
        this.user = {
            email: '',
            password: '',
            mobile: ''
        };
        this.page.actionBarHidden = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            email: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                ]],
            password: [null, forms_1.Validators.required],
            mobile: [null, forms_1.Validators.required]
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
    LoginComponent.prototype.toggleForm = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.loginService.login(this.form.value).subscribe(function (res) {
                console.log(res);
                application_settings_1.setBoolean("isLoggedin", true);
                application_settings_1.setString('token', "gfjhgjkfdhgkfhg");
                console.log(application_settings_1.getBoolean('isLoggedin'));
                console.log(application_settings_1.getString('token'));
            });
        }
        else {
            this.markFormGroupTouched(this.form);
        }
        // if (!this.user.email || !this.user.password) {
        //   this.alert("Please provide both an email address and password.");
        //   return;
        // }
        // this.processing = true;
        // if (this.isLoggingIn) {
        //   this.login();
        // } else {
        //   this.register();
        // }
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
        application_settings_1.setBoolean("isLoggedin", true);
        application_settings_1.setString('token', "gfjhgjkfdhgkfhg");
        this.router.navigate(['/']);
    };
    LoginComponent.prototype.login = function () {
        console.log(this.user);
        this.router.navigate(['/']);
    };
    LoginComponent.prototype.register = function () {
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
    LoginComponent.prototype.alert = function (message) {
        return dialogs_1.alert({
            title: "Shyam Future Store",
            okButtonText: "OK",
            message: message
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
            router_1.Router,
            forms_1.FormBuilder,
            login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6Qyx1REFBNEQ7QUFDNUQsaURBQWdEO0FBQ2hELHdDQUFvRTtBQUNwRSxnRUFBOEQ7QUFDOUQsNkRBQTJGO0FBUTNGO0lBVUUsd0JBQ1UsSUFBVSxFQUNWLE1BQWMsRUFDZCxXQUF3QixFQUN4QixZQUEwQjtRQUgxQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWnBDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFHO1lBQ0wsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxFQUFFO1NBQ1gsQ0FBQTtRQVFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNWLGtCQUFVLENBQUMsUUFBUTtvQkFDbkIsa0JBQVUsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUM7aUJBQ3hFLENBQUM7WUFDRixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDckMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsS0FBYTtRQUN4QixNQUFN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QSxBQXpIRCxJQXlIQztBQXpIWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhbGVydCwgcHJvbXB0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9zZXJ2aWNlcy9sb2dpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibG9naW5cIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xyXG4gIHByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICB1c2VyID0ge1xyXG4gICAgZW1haWw6ICcnLFxyXG4gICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgbW9iaWxlOiAnJ1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBlbWFpbDogWycnLCBbXHJcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oL15bYS16QS1aMC05Ll8lKy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVpdezIsNH0kLylcclxuICAgICAgXV0sXHJcbiAgICAgIHBhc3N3b3JkOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIG1vYmlsZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICBpc0ZpZWxkVmFsaWQoZmllbGQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuICF0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWxpZCAmJiAodGhpcy5mb3JtLmdldChmaWVsZCkuZGlydHkgfHwgdGhpcy5mb3JtLmdldChmaWVsZCkudG91Y2hlZCk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RmllbGRDc3MoZmllbGQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2lzLWludmFsaWQnOiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS5pbnZhbGlkICYmICh0aGlzLmZvcm0uZ2V0KGZpZWxkKS5kaXJ0eSB8fCB0aGlzLmZvcm0uZ2V0KGZpZWxkKS50b3VjaGVkKSxcclxuICAgICAgJ2lzLXZhbGlkJzogdGhpcy5mb3JtLmdldChmaWVsZCkudmFsaWQgJiYgKHRoaXMuZm9ybS5nZXQoZmllbGQpLmRpcnR5IHx8IHRoaXMuZm9ybS5nZXQoZmllbGQpLnRvdWNoZWQpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRm9ybSgpIHtcclxuICAgIHRoaXMuaXNMb2dnaW5nSW4gPSAhdGhpcy5pc0xvZ2dpbmdJbjtcclxuICB9XHJcblxyXG4gIHN1Ym1pdCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XHJcbiAgICAgIHRoaXMubG9naW5TZXJ2aWNlLmxvZ2luKHRoaXMuZm9ybS52YWx1ZSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIHNldEJvb2xlYW4oXCJpc0xvZ2dlZGluXCIsIHRydWUpXHJcbiAgICAgICAgc2V0U3RyaW5nKCd0b2tlbicsIFwiZ2ZqaGdqa2ZkaGdrZmhnXCIpXHJcbiAgICAgICAgY29uc29sZS5sb2coZ2V0Qm9vbGVhbignaXNMb2dnZWRpbicpKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGdldFN0cmluZygndG9rZW4nKSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSlcclxuICAgIH1cclxuICAgIC8vIGlmICghdGhpcy51c2VyLmVtYWlsIHx8ICF0aGlzLnVzZXIucGFzc3dvcmQpIHtcclxuICAgIC8vICAgdGhpcy5hbGVydChcIlBsZWFzZSBwcm92aWRlIGJvdGggYW4gZW1haWwgYWRkcmVzcyBhbmQgcGFzc3dvcmQuXCIpO1xyXG4gICAgLy8gICByZXR1cm47XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdGhpcy5wcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgIC8vIGlmICh0aGlzLmlzTG9nZ2luZ0luKSB7XHJcbiAgICAvLyAgIHRoaXMubG9naW4oKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIHRoaXMucmVnaXN0ZXIoKTtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIG1hcmtGb3JtR3JvdXBUb3VjaGVkKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICAoPGFueT5PYmplY3QpLnZhbHVlcyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goY29udHJvbCA9PiB7XHJcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG4gICAgICBpZiAoY29udHJvbC5jb250cm9scykge1xyXG4gICAgICAgIGNvbnRyb2wuY29udHJvbHMuZm9yRWFjaChjID0+IHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQoYykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNraXAoKSB7XHJcbiAgICBzZXRCb29sZWFuKFwiaXNMb2dnZWRpblwiLCB0cnVlKVxyXG4gICAgc2V0U3RyaW5nKCd0b2tlbicsIFwiZ2ZqaGdqa2ZkaGdrZmhnXCIpXHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSlcclxuICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy51c2VyKVxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pXHJcbiAgfVxyXG5cclxuICByZWdpc3RlcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBmb3Jnb3RQYXNzd29yZCgpIHtcclxuICAgIHByb21wdCh7XHJcbiAgICAgIHRpdGxlOiBcIkZvcmdvdCBQYXNzd29yZFwiLFxyXG4gICAgICBtZXNzYWdlOiBcIkVudGVyIHRoZSBlbWFpbCBhZGRyZXNzIHlvdSB1c2VkIHRvIHJlZ2lzdGVyIGZvciBTaHlhbSBGdXR1cmUgU3RvcmUgdG8gcmVzZXQgeW91ciBwYXNzd29yZC5cIixcclxuICAgICAgaW5wdXRUeXBlOiBcImVtYWlsXCIsXHJcbiAgICAgIGRlZmF1bHRUZXh0OiBcIlwiLFxyXG4gICAgICBva0J1dHRvblRleHQ6IFwiT2tcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGFsZXJ0KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGFsZXJ0KHtcclxuICAgICAgdGl0bGU6IFwiU2h5YW0gRnV0dXJlIFN0b3JlXCIsXHJcbiAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiLFxyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=