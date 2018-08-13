"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_filter_select_1 = require("nativescript-filter-select");
element_registry_1.registerElement('FilterSelect', function () { return nativescript_filter_select_1.FilterSelect; });
var explore_service_1 = require("../../core/services/explore.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var login_modal_component_1 = require("../../core/component/login-modal/login-modal.component");
var signup_modal_component_1 = require("../../core/component/signup-modal/signup-modal.component");
var location_modal_component_1 = require("../../core/component/location-modal/location-modal.component");
var application_settings_1 = require("application-settings");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
// var gestures = require("ui/gestures");
var ExploreComponent = /** @class */ (function () {
    function ExploreComponent(exploreService, modal, vcRef) {
        this.exploreService = exploreService;
        this.modal = modal;
        this.vcRef = vcRef;
        this.category_list = [];
        this.app_list = [];
        this.selected_category = '';
        this.location = '';
        this.options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.user_app_list = [];
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        this.lodaing_options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: true,
                cancelListener: function (dialog) { console.log("Loading cancelled"); },
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
            ios: {
                details: "Additional detail note!",
                margin: 10,
                dimBackground: true,
                color: "#4B9ED6",
                backgroundColor: "yellow",
                userInteractionEnabled: false,
                hideBezel: true,
            }
        };
        this.rating = [1, 2, 3, 4, 5];
    }
    ExploreComponent.prototype.ngOnInit = function () {
        this.loader.show(this.lodaing_options);
        this.user_id = application_settings_1.getString('user_id');
        console.log(application_settings_1.getString('user_id'));
        this.getCategoryList();
        if (this.user_id != undefined) {
            this.getDashboardAppList();
        }
        else {
            this.getMostViewAppList();
        }
    };
    ExploreComponent.prototype.getDashboardAppList = function () {
        var _this = this;
        this.exploreService.getUserDashboardAppList(this.user_id).subscribe(function (res) {
            _this.user_app_list = res['app_master'];
            console.log(res);
            _this.getMostViewAppList();
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.getCategoryList = function () {
        var _this = this;
        this.exploreService.getCategoryList().subscribe(function (res) {
            _this.category_list = res;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.getMostViewAppList = function () {
        var _this = this;
        this.exploreService.getMostViewAppList().subscribe(function (res) {
            _this.app_list = [];
            if (_this.user_app_list.length > 0) {
                res.forEach(function (x) {
                    var index = _this.user_app_list.findIndex(function (y) { return y.id == x.id; });
                    console.log(index);
                    if (index != -1) {
                        x['isDashboard'] = true;
                    }
                    else {
                        x['isDashboard'] = false;
                    }
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
                _this.loader.hide();
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
                _this.loader.hide();
            }
            console.log(res);
        }, function (error) {
            _this.loader.hide();
            console.log(error);
        });
    };
    ExploreComponent.prototype.openLoginModal = function (app_id) {
        var _this = this;
        this.modal.showModal(login_modal_component_1.LoginModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res != undefined) {
                if (res.signup) {
                    _this.openSignupModal(app_id);
                }
                else if (res.success == 1) {
                    _this.user_id = res.user_id;
                    _this.appAttachAndDisattach(app_id, _this.user_id);
                }
            }
            else {
                var index = _this.app_list.findIndex(function (x) { return x.id == app_id; });
                _this.app_list[index].isDashboard = false;
            }
        });
    };
    ExploreComponent.prototype.openSignupModal = function (app_id) {
        var _this = this;
        this.modal.showModal(signup_modal_component_1.SignUpModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res != undefined) {
                if (res.signin) {
                    _this.openLoginModal(app_id);
                }
                else if (res.success == 1) {
                    _this.user_id = res.id;
                    _this.appAttachAndDisattach(app_id, _this.user_id);
                }
            }
            else {
                var index = _this.app_list.findIndex(function (x) { return x.id == app_id; });
                _this.app_list[index].isDashboard = false;
            }
        });
    };
    ExploreComponent.prototype.addToDashboard = function (app_id) {
        if (!application_settings_1.getBoolean('isLoggedin')) {
            this.openLoginModal(app_id);
        }
        else {
            this.appAttachAndDisattach(app_id, this.user_id);
        }
    };
    ExploreComponent.prototype.appAttachAndDisattach = function (app, user) {
        var _this = this;
        this.loader.show(this.lodaing_options);
        var index = this.app_list.findIndex(function (x) { return x.id == app; });
        if (index != -1) {
            this.app_list[index].isDashboard = !this.app_list[index].isDashboard;
            var data = {
                "customer": user,
                "app_master": app
            };
            this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(function (res) {
                _this.loader.hide();
                console.log(res);
            }, function (error) {
                _this.loader.hide();
                console.log(error);
            });
        }
    };
    ExploreComponent.prototype.searchLocation = function () {
        var _this = this;
        var option = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(location_modal_component_1.LocationModalComponent, option).then(function (res) {
            console.log(res);
            if (res.current == true) {
                _this.location = "Current Location";
                _this.latitude = res.place.latitude;
                _this.longitude = res.place.longitude;
                _this.searchAppList();
            }
            else if (res.current == false) {
                _this.location = res.place.name;
                _this.latitude = res.place.latitude;
                _this.longitude = res.place.longitude;
                _this.searchAppList();
            }
        });
    };
    ExploreComponent.prototype.onCategoryChange = function (args) {
        this.selected_category = '';
        var SelectedCat = [];
        args.selected.forEach(function (element) {
            SelectedCat.push(element.id);
        });
        this.selected_category = SelectedCat.toString();
        this.searchAppList();
    };
    ExploreComponent.prototype.searchAppList = function () {
        var _this = this;
        this.loader.show(this.lodaing_options);
        var params = '';
        if (this.location != '' && this.selected_category != '') {
            params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&category=' + this.selected_category;
        }
        else if (this.location == '' && this.selected_category != '') {
            params = '?category=' + this.selected_category;
        }
        else if (this.location != '' && this.selected_category == '') {
            params = '?latitude=' + this.latitude + '&longitude=' + this.longitude;
        }
        this.exploreService.getAllAppList(params).subscribe(function (res) {
            _this.app_list = [];
            if (_this.user_app_list.length > 0) {
                res.results.forEach(function (x) {
                    var index = _this.user_app_list.findIndex(function (y) { return y.id == x.id; });
                    if (index != -1) {
                        x['isDashboard'] = true;
                    }
                    else {
                        x['isDashboard'] = false;
                    }
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
                _this.loader.hide();
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
                _this.loader.hide();
            }
            console.log(res);
        }, function (error) {
            _this.loader.hide();
            console.log(error);
        });
    };
    ExploreComponent.prototype.search = function () {
        this.searchAppList();
    };
    __decorate([
        core_1.ViewChild('myfilter'),
        __metadata("design:type", core_1.ElementRef)
    ], ExploreComponent.prototype, "myfilter", void 0);
    __decorate([
        core_1.ViewChild("scrollView"),
        __metadata("design:type", core_1.ElementRef)
    ], ExploreComponent.prototype, "scrollView", void 0);
    ExploreComponent = __decorate([
        core_1.Component({
            selector: "explore",
            moduleId: module.id,
            templateUrl: "./explore.component.html",
            styleUrls: ['./explore.component.css']
        }),
        __metadata("design:paramtypes", [explore_service_1.ExploreService,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef])
    ], ExploreComponent);
    return ExploreComponent;
}());
exports.ExploreComponent = ExploreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBQ3BELHVFQUFxRTtBQUVyRSxtRUFBNkU7QUFDN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyx5R0FBc0c7QUFDdEcsNkRBQTJGO0FBQzNGLGlGQUFrRTtBQUNsRSx5Q0FBeUM7QUFPekM7SUF5Q0UsMEJBQ1UsY0FBOEIsRUFDOUIsS0FBeUIsRUFDekIsS0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBM0NqQyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBRztZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDN0IsQ0FBQztRQUVGLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBR3hCLFdBQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7UUFDaEMsb0JBQWUsR0FBRztZQUNoQixPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGNBQWMsRUFBRSxVQUFVLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFt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LENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBcFBzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtzREFBQztJQUVuQjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBYSxpQkFBVTt3REFBQztJQXhDckMsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQTJDMEIsZ0NBQWM7WUFDdkIsNEJBQWtCO1lBQ2xCLHVCQUFnQjtPQTVDdEIsZ0JBQWdCLENBNlI1QjtJQUFELHVCQUFDO0NBQUEsQUE3UkQsSUE2UkM7QUE3UlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgRmlsdGVyU2VsZWN0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWZpbHRlci1zZWxlY3QnO1xyXG5yZWdpc3RlckVsZW1lbnQoJ0ZpbHRlclNlbGVjdCcsICgpID0+IEZpbHRlclNlbGVjdCk7XHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduVXBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L3NpZ251cC1tb2RhbC9zaWdudXAtbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9jYXRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L2xvY2F0aW9uLW1vZGFsL2xvY2F0aW9uLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG4vLyB2YXIgZ2VzdHVyZXMgPSByZXF1aXJlKFwidWkvZ2VzdHVyZXNcIik7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImV4cGxvcmVcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vZXhwbG9yZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogWycuL2V4cGxvcmUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFeHBsb3JlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBjYXRlZ29yeV9saXN0OiBhbnkgPSBbXTtcclxuICBhcHBfbGlzdDogYW55ID0gW107XHJcbiAgc2VsZWN0ZWRfY2F0ZWdvcnk6IHN0cmluZyA9ICcnO1xyXG4gIGxvY2F0aW9uOiBzdHJpbmcgPSAnJztcclxuICBvcHRpb25zID0ge1xyXG4gICAgY29udGV4dDoge30sXHJcbiAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICB9O1xyXG4gIHVzZXJfaWQ6IHN0cmluZztcclxuICB1c2VyX2FwcF9saXN0OiBhbnkgPSBbXTtcclxuICBsYXRpdHVkZTogYW55O1xyXG4gIGxvbmdpdHVkZTogYW55O1xyXG4gIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbiAgbG9kYWluZ19vcHRpb25zID0ge1xyXG4gICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICBhbmRyb2lkOiB7XHJcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbiAoZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgbWF4OiAxMDAsXHJcbiAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxyXG4gICAgfSxcclxuICAgIGlvczoge1xyXG4gICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIixcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGlkZUJlemVsOiB0cnVlLFxyXG4gICAgfVxyXG4gIH1cclxuICBAVmlld0NoaWxkKCdteWZpbHRlcicpIG15ZmlsdGVyOiBFbGVtZW50UmVmO1xyXG4gIHJhdGluZzogYW55ID0gWzEsIDIsIDMsIDQsIDVdO1xyXG4gIEBWaWV3Q2hpbGQoXCJzY3JvbGxWaWV3XCIpIHNjcm9sbFZpZXc6IEVsZW1lbnRSZWY7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4cGxvcmVTZXJ2aWNlOiBFeHBsb3JlU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWZcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5sb2RhaW5nX29wdGlvbnMpO1xyXG4gICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhnZXRTdHJpbmcoJ3VzZXJfaWQnKSlcclxuICAgIHRoaXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMudXNlcl9pZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5nZXREYXNoYm9hcmRBcHBMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRNb3N0Vmlld0FwcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIFxyXG5cclxuICBnZXREYXNoYm9hcmRBcHBMaXN0KCkge1xyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRVc2VyRGFzaGJvYXJkQXBwTGlzdCh0aGlzLnVzZXJfaWQpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLnVzZXJfYXBwX2xpc3QgPSByZXNbJ2FwcF9tYXN0ZXInXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgdGhpcy5nZXRNb3N0Vmlld0FwcExpc3QoKTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICBnZXRDYXRlZ29yeUxpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldENhdGVnb3J5TGlzdCgpLnN1YnNjcmliZShcclxuICAgICAgKHJlczogYW55W10pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5X2xpc3QgPSByZXM7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIGdldE1vc3RWaWV3QXBwTGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0TW9zdFZpZXdBcHBMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy51c2VyX2FwcF9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnVzZXJfYXBwX2xpc3QuZmluZEluZGV4KHkgPT4geS5pZCA9PSB4LmlkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHhbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQoeFsnYXZnX3JhdGluZyddKVxyXG4gICAgICAgICAgICB0aGlzLmFwcF9saXN0LnB1c2goeCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4Wydpc0Rhc2hib2FyZCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHhbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQoeFsnYXZnX3JhdGluZyddKVxyXG4gICAgICAgICAgICB0aGlzLmFwcF9saXN0LnB1c2goeCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG5cclxuICBvcGVuTG9naW5Nb2RhbChhcHBfaWQpIHtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKExvZ2luTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICBpZiAocmVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChyZXMuc2lnbnVwKSB7XHJcbiAgICAgICAgICB0aGlzLm9wZW5TaWdudXBNb2RhbChhcHBfaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJfaWQgPSByZXMudXNlcl9pZDtcclxuICAgICAgICAgIHRoaXMuYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcF9pZCwgdGhpcy51c2VyX2lkKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFwcF9saXN0LmZpbmRJbmRleCh4ID0+IHguaWQgPT0gYXBwX2lkKTtcclxuICAgICAgICB0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZCA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvcGVuU2lnbnVwTW9kYWwoYXBwX2lkKSB7XHJcbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTaWduVXBNb2RhbENvbXBvbmVudCwgdGhpcy5vcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIGlmIChyZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHJlcy5zaWduaW4pIHtcclxuICAgICAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoYXBwX2lkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgICAgdGhpcy51c2VyX2lkID0gcmVzLmlkO1xyXG4gICAgICAgICAgdGhpcy5hcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwX2lkLCB0aGlzLnVzZXJfaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuYXBwX2xpc3QuZmluZEluZGV4KHggPT4geC5pZCA9PSBhcHBfaWQpO1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFkZFRvRGFzaGJvYXJkKGFwcF9pZCkge1xyXG4gICAgaWYgKCFnZXRCb29sZWFuKCdpc0xvZ2dlZGluJykpIHtcclxuICAgICAgdGhpcy5vcGVuTG9naW5Nb2RhbChhcHBfaWQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcF9pZCwgdGhpcy51c2VyX2lkKVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGFwcEF0dGFjaEFuZERpc2F0dGFjaChhcHAsIHVzZXIpIHtcclxuICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5sb2RhaW5nX29wdGlvbnMpO1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hcHBfbGlzdC5maW5kSW5kZXgoeCA9PiB4LmlkID09IGFwcClcclxuICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZCA9ICF0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZDtcclxuICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgXCJjdXN0b21lclwiOiB1c2VyLFxyXG4gICAgICAgIFwiYXBwX21hc3RlclwiOiBhcHBcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmFwcEF0dGFjaEFuZERpc2F0dGFjaFRvRGFzaGJvYXJkKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VhcmNoTG9jYXRpb24oKSB7XHJcbiAgICB2YXIgb3B0aW9uID0ge1xyXG4gICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgfTtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKExvY2F0aW9uTW9kYWxDb21wb25lbnQsIG9wdGlvbikudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgaWYgKHJlcy5jdXJyZW50ID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gXCJDdXJyZW50IExvY2F0aW9uXCI7XHJcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5wbGFjZS5sYXRpdHVkZTtcclxuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlcy5wbGFjZS5sb25naXR1ZGU7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hBcHBMaXN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocmVzLmN1cnJlbnQgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gcmVzLnBsYWNlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5wbGFjZS5sYXRpdHVkZTtcclxuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlcy5wbGFjZS5sb25naXR1ZGU7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hBcHBMaXN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkNhdGVnb3J5Q2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPSAnJztcclxuICAgIHZhciBTZWxlY3RlZENhdDogYW55ID0gW107XHJcbiAgICBhcmdzLnNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIFNlbGVjdGVkQ2F0LnB1c2goZWxlbWVudC5pZClcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9IFNlbGVjdGVkQ2F0LnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLnNlYXJjaEFwcExpc3QoKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaEFwcExpc3QoKSB7XHJcbiAgICB0aGlzLmxvYWRlci5zaG93KHRoaXMubG9kYWluZ19vcHRpb25zKTtcclxuICAgIGxldCBwYXJhbXMgPSAnJztcclxuICAgIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgIT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9sYXRpdHVkZT0nICsgdGhpcy5sYXRpdHVkZSArICcmbG9uZ2l0dWRlPScgKyB0aGlzLmxvbmdpdHVkZSArICcmY2F0ZWdvcnk9JyArIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmxvY2F0aW9uID09ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgIT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9jYXRlZ29yeT0nICsgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubG9jYXRpb24gIT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9PSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP2xhdGl0dWRlPScgKyB0aGlzLmxhdGl0dWRlICsgJyZsb25naXR1ZGU9JyArIHRoaXMubG9uZ2l0dWRlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRBbGxBcHBMaXN0KHBhcmFtcykuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy51c2VyX2FwcF9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJlcy5yZXN1bHRzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudXNlcl9hcHBfbGlzdC5maW5kSW5kZXgoeSA9PiB5LmlkID09IHguaWQpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4WydhdmdfcmF0aW5nJ10gPSBNYXRoLnJvdW5kKHhbJ2F2Z19yYXRpbmcnXSlcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4Wydpc0Rhc2hib2FyZCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHhbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQoeFsnYXZnX3JhdGluZyddKVxyXG4gICAgICAgICAgICB0aGlzLmFwcF9saXN0LnB1c2goeCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlYXJjaEFwcExpc3QoKTtcclxuICB9XHJcblxyXG4gIC8vIGh0dHA6Ly8xOTIuMTY4LjI0LjIwODo4MDAwL3NlYXJjaF9hcHAvP2xhdGl0dWRlPTIyLjU0MDI2MDImbG9uZ2l0dWRlPTg4LjM4MjE5ODlcclxufSJdfQ==