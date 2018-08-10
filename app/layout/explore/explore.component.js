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
        this.rating = [1, 2, 3, 4, 5];
    }
    ExploreComponent.prototype.ngOnInit = function () {
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
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
            }
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.openLoginModal = function (app_id) {
        var _this = this;
        this.modal.showModal(login_modal_component_1.LoginModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res.signup) {
                _this.openSignupModal(app_id);
            }
            else if (res.success == 1) {
                _this.appAttachAndDisattach(app_id, res.user_id);
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
            if (res.signin) {
                _this.openLoginModal(app_id);
            }
            else if (res.success == 1) {
                _this.appAttachAndDisattach(app_id, res.user_id);
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
        var index = this.app_list.findIndex(function (x) { return x.id == app; });
        if (index != -1) {
            this.app_list[index].isDashboard = !this.app_list[index].isDashboard;
            var data = {
                "customer": user,
                "app_master": app
            };
            this.exploreService.appAttachAndDisattachToDashboard(data).subscribe(function (res) {
                console.log(res);
            }, function (error) {
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
                res.forEach(function (x) {
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
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
                    x['avg_rating'] = Math.round(x['avg_rating']);
                    _this.app_list.push(x);
                });
            }
            console.log(res);
        }, function (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBQ3BELHVFQUFxRTtBQUVyRSxtRUFBNkU7QUFDN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyx5R0FBc0c7QUFDdEcsNkRBQTJGO0FBUzNGO0lBZ0JFLDBCQUNVLGNBQThCLEVBQzlCLEtBQXlCLEVBQ3pCLEtBQXVCO1FBRnZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQWxCakMsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQUc7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQzdCLENBQUM7UUFFRixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUl4QixXQUFNLEdBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7SUFPekIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxD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Q0FBQzt5Q0FrQjBCLGdDQUFjO1lBQ3ZCLDRCQUFrQjtZQUNsQix1QkFBZ0I7T0FuQnRCLGdCQUFnQixDQWtQNUI7SUFBRCx1QkFBQztDQUFBLEFBbFBELElBa1BDO0FBbFBZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XHJcbmltcG9ydCB7IEZpbHRlclNlbGVjdCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1maWx0ZXItc2VsZWN0JztcclxucmVnaXN0ZXJFbGVtZW50KCdGaWx0ZXJTZWxlY3QnLCAoKSA9PiBGaWx0ZXJTZWxlY3QpO1xyXG5pbXBvcnQgeyBFeHBsb3JlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL2V4cGxvcmUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29yZS9jb21wb25lbnQvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnblVwTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9zaWdudXAtbW9kYWwvc2lnbnVwLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvY2F0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9sb2NhdGlvbi1tb2RhbC9sb2NhdGlvbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZywgZ2V0Qm9vbGVhbiwgc2V0Qm9vbGVhbiwgY2xlYXIgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJleHBsb3JlXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2V4cGxvcmUuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9leHBsb3JlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY2F0ZWdvcnlfbGlzdDogYW55ID0gW107XHJcbiAgYXBwX2xpc3Q6IGFueSA9IFtdO1xyXG4gIHNlbGVjdGVkX2NhdGVnb3J5OiBzdHJpbmcgPSAnJztcclxuICBsb2NhdGlvbjogc3RyaW5nID0gJyc7XHJcbiAgb3B0aW9ucyA9IHtcclxuICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgfTtcclxuICB1c2VyX2lkOiBzdHJpbmc7XHJcbiAgdXNlcl9hcHBfbGlzdDogYW55ID0gW107XHJcbiAgbGF0aXR1ZGU6IGFueTtcclxuICBsb25naXR1ZGU6IGFueTtcclxuICBAVmlld0NoaWxkKCdteWZpbHRlcicpIG15ZmlsdGVyOiBFbGVtZW50UmVmO1xyXG4gIHJhdGluZzogYW55ID0gWzEsMiwzLDQsNV1cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhnZXRTdHJpbmcoJ3VzZXJfaWQnKSlcclxuICAgIHRoaXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMudXNlcl9pZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5nZXREYXNoYm9hcmRBcHBMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRNb3N0Vmlld0FwcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgfSAgXHJcblxyXG4gIGdldERhc2hib2FyZEFwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldFVzZXJEYXNoYm9hcmRBcHBMaXN0KHRoaXMudXNlcl9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlcl9hcHBfbGlzdCA9IHJlc1snYXBwX21hc3RlciddXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0Q2F0ZWdvcnlMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHJlczsgICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBnZXRNb3N0Vmlld0FwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldE1vc3RWaWV3QXBwTGlzdCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9saXN0ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMudXNlcl9hcHBfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy51c2VyX2FwcF9saXN0LmZpbmRJbmRleCh5ID0+IHkuaWQgPT0geC5pZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4WydhdmdfcmF0aW5nJ10gPSBNYXRoLnJvdW5kKHhbJ2F2Z19yYXRpbmcnXSlcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB4WydhdmdfcmF0aW5nJ10gPSBNYXRoLnJvdW5kKHhbJ2F2Z19yYXRpbmcnXSlcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG5cclxuICBvcGVuTG9naW5Nb2RhbChhcHBfaWQpIHtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKExvZ2luTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICBpZiAocmVzLnNpZ251cCkge1xyXG4gICAgICAgIHRoaXMub3BlblNpZ251cE1vZGFsKGFwcF9pZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocmVzLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcF9pZCwgcmVzLnVzZXJfaWQpXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hcHBfbGlzdC5maW5kSW5kZXgoeCA9PiB4LmlkID09IGFwcF9pZCk7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdFtpbmRleF0uaXNEYXNoYm9hcmQgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgb3BlblNpZ251cE1vZGFsKGFwcF9pZCkge1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2lnblVwTW9kYWxDb21wb25lbnQsIHRoaXMub3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICBpZiAocmVzLnNpZ25pbikge1xyXG4gICAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoYXBwX2lkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdGhpcy5hcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwX2lkLCByZXMudXNlcl9pZClcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFwcF9saXN0LmZpbmRJbmRleCh4ID0+IHguaWQgPT0gYXBwX2lkKTtcclxuICAgICAgICB0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZCA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhZGRUb0Rhc2hib2FyZChhcHBfaWQpIHtcclxuICAgIGlmICghZ2V0Qm9vbGVhbignaXNMb2dnZWRpbicpKSB7XHJcbiAgICAgIHRoaXMub3BlbkxvZ2luTW9kYWwoYXBwX2lkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFwcEF0dGFjaEFuZERpc2F0dGFjaChhcHBfaWQsIHRoaXMudXNlcl9pZClcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBhcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwLCB1c2VyKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFwcF9saXN0LmZpbmRJbmRleCh4ID0+IHguaWQgPT0gYXBwKVxyXG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgIHRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkID0gIXRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkO1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBcImN1c3RvbWVyXCI6IHVzZXIsXHJcbiAgICAgICAgXCJhcHBfbWFzdGVyXCI6IGFwcFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuYXBwQXR0YWNoQW5kRGlzYXR0YWNoVG9EYXNoYm9hcmQoZGF0YSkuc3Vic2NyaWJlKFxyXG4gICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlYXJjaExvY2F0aW9uKCkge1xyXG4gICAgdmFyIG9wdGlvbiA9IHtcclxuICAgICAgY29udGV4dDoge30sXHJcbiAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgIH07XHJcbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChMb2NhdGlvbk1vZGFsQ29tcG9uZW50LCBvcHRpb24pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuXHJcbiAgICAgIGlmIChyZXMuY3VycmVudCA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IFwiQ3VycmVudCBMb2NhdGlvblwiO1xyXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMucGxhY2UubGF0aXR1ZGU7XHJcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMucGxhY2UubG9uZ2l0dWRlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQXBwTGlzdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy5jdXJyZW50ID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlcy5wbGFjZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMucGxhY2UubGF0aXR1ZGU7XHJcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMucGxhY2UubG9uZ2l0dWRlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQXBwTGlzdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgb25DYXRlZ29yeUNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ID0gJyc7XHJcbiAgICB2YXIgU2VsZWN0ZWRDYXQ6IGFueSA9IFtdO1xyXG4gICAgYXJncy5zZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBTZWxlY3RlZENhdC5wdXNoKGVsZW1lbnQuaWQpXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPSBTZWxlY3RlZENhdC50b1N0cmluZygpO1xyXG4gICAgdGhpcy5zZWFyY2hBcHBMaXN0KCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hBcHBMaXN0KCkge1xyXG4gICAgbGV0IHBhcmFtcyA9ICcnO1xyXG4gICAgaWYgKHRoaXMubG9jYXRpb24gIT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSAhPSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP2xhdGl0dWRlPScgKyB0aGlzLmxhdGl0dWRlICsgJyZsb25naXR1ZGU9JyArIHRoaXMubG9uZ2l0dWRlICsgJyZjYXRlZ29yeT0nICsgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubG9jYXRpb24gPT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSAhPSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP2NhdGVnb3J5PScgKyB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5sb2NhdGlvbiAhPSAnJyAmJiB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ID09ICcnKSB7XHJcbiAgICAgIHBhcmFtcyA9ICc/bGF0aXR1ZGU9JyArIHRoaXMubGF0aXR1ZGUgKyAnJmxvbmdpdHVkZT0nICsgdGhpcy5sb25naXR1ZGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldEFsbEFwcExpc3QocGFyYW1zKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJfYXBwX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudXNlcl9hcHBfbGlzdC5maW5kSW5kZXgoeSA9PiB5LmlkID09IHguaWQpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4WydhdmdfcmF0aW5nJ10gPSBNYXRoLnJvdW5kKHhbJ2F2Z19yYXRpbmcnXSlcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB4WydhdmdfcmF0aW5nJ10gPSBNYXRoLnJvdW5kKHhbJ2F2Z19yYXRpbmcnXSlcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHNlYXJjaCgpIHtcclxuICAgIHRoaXMuc2VhcmNoQXBwTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gaHR0cDovLzE5Mi4xNjguMjQuMjA4OjgwMDAvc2VhcmNoX2FwcC8/bGF0aXR1ZGU9MjIuNTQwMjYwMiZsb25naXR1ZGU9ODguMzgyMTk4OVxyXG59Il19