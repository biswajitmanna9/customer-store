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
                    _this.app_list.push(x);
                });
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
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
            }
            else if (res.current == false) {
                _this.location = res.place.name;
                _this.latitude = res.place.latitude;
                _this.longitude = res.place.longitude;
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
                    _this.app_list.push(x);
                });
            }
            else {
                res.forEach(function (x) {
                    x['isDashboard'] = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBQ3BELHVFQUFxRTtBQUVyRSxtRUFBNkU7QUFDN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyx5R0FBc0c7QUFDdEcsNkRBQTJGO0FBUzNGO0lBZUUsMEJBQ1UsY0FBOEIsRUFDOUIsS0FBeUIsRUFDekIsS0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBakJqQyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBRztZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDN0IsQ0FBQztRQUVGLGtCQUFhLEdBQVEsRUFBRSxDQUFDO0lBVXhCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxD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O1lBQ0osQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBek5zQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtzREFBQztJQWRqQyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBaUIwQixnQ0FBYztZQUN2Qiw0QkFBa0I7WUFDbEIsdUJBQWdCO09BbEJ0QixnQkFBZ0IsQ0EwTzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTFPRCxJQTBPQztBQTFPWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZWxlY3QgfSBmcm9tICduYXRpdmVzY3JpcHQtZmlsdGVyLXNlbGVjdCc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnRmlsdGVyU2VsZWN0JywgKCkgPT4gRmlsdGVyU2VsZWN0KTtcclxuaW1wb3J0IHsgRXhwbG9yZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9leHBsb3JlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZ25VcE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29yZS9jb21wb25lbnQvc2lnbnVwLW1vZGFsL3NpZ251cC1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29yZS9jb21wb25lbnQvbG9jYXRpb24tbW9kYWwvbG9jYXRpb24tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcsIGdldEJvb2xlYW4sIHNldEJvb2xlYW4sIGNsZWFyIH0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZXhwbG9yZVwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9leHBsb3JlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZXhwbG9yZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cGxvcmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gIGFwcF9saXN0OiBhbnkgPSBbXTtcclxuICBzZWxlY3RlZF9jYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcbiAgbG9jYXRpb246IHN0cmluZyA9ICcnO1xyXG4gIG9wdGlvbnMgPSB7XHJcbiAgICBjb250ZXh0OiB7fSxcclxuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gIH07XHJcbiAgdXNlcl9pZDogc3RyaW5nO1xyXG4gIHVzZXJfYXBwX2xpc3Q6IGFueSA9IFtdO1xyXG4gIGxhdGl0dWRlOiBhbnk7XHJcbiAgbG9uZ2l0dWRlOiBhbnk7XHJcbiAgQFZpZXdDaGlsZCgnbXlmaWx0ZXInKSBteWZpbHRlcjogRWxlbWVudFJlZjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51c2VyX2lkID0gZ2V0U3RyaW5nKCd1c2VyX2lkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhnZXRTdHJpbmcoJ3VzZXJfaWQnKSlcclxuICAgIHRoaXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMudXNlcl9pZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5nZXREYXNoYm9hcmRBcHBMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRNb3N0Vmlld0FwcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgfSAgXHJcblxyXG4gIGdldERhc2hib2FyZEFwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldFVzZXJEYXNoYm9hcmRBcHBMaXN0KHRoaXMudXNlcl9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlcl9hcHBfbGlzdCA9IHJlc1snYXBwX21hc3RlciddXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0Q2F0ZWdvcnlMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHJlczsgICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBnZXRNb3N0Vmlld0FwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldE1vc3RWaWV3QXBwTGlzdCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9saXN0ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMudXNlcl9hcHBfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy51c2VyX2FwcF9saXN0LmZpbmRJbmRleCh5ID0+IHkuaWQgPT0geC5pZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFwcF9saXN0LnB1c2goeCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4Wydpc0Rhc2hib2FyZCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwX2xpc3QucHVzaCh4KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuXHJcbiAgb3BlbkxvZ2luTW9kYWwoYXBwX2lkKSB7XHJcbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChMb2dpbk1vZGFsQ29tcG9uZW50LCB0aGlzLm9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgaWYgKHJlcy5zaWdudXApIHtcclxuICAgICAgICB0aGlzLm9wZW5TaWdudXBNb2RhbChhcHBfaWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICB0aGlzLmFwcEF0dGFjaEFuZERpc2F0dGFjaChhcHBfaWQsIHJlcy51c2VyX2lkKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuYXBwX2xpc3QuZmluZEluZGV4KHggPT4geC5pZCA9PSBhcHBfaWQpO1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9wZW5TaWdudXBNb2RhbChhcHBfaWQpIHtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNpZ25VcE1vZGFsQ29tcG9uZW50LCB0aGlzLm9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgaWYgKHJlcy5zaWduaW4pIHtcclxuICAgICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKGFwcF9pZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocmVzLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcF9pZCwgcmVzLnVzZXJfaWQpXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hcHBfbGlzdC5maW5kSW5kZXgoeCA9PiB4LmlkID09IGFwcF9pZCk7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdFtpbmRleF0uaXNEYXNoYm9hcmQgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYWRkVG9EYXNoYm9hcmQoYXBwX2lkKSB7XHJcbiAgICBpZiAoIWdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSkge1xyXG4gICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKGFwcF9pZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwX2lkLCB0aGlzLnVzZXJfaWQpXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcCwgdXNlcikge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hcHBfbGlzdC5maW5kSW5kZXgoeCA9PiB4LmlkID09IGFwcClcclxuICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICB0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZCA9ICF0aGlzLmFwcF9saXN0W2luZGV4XS5pc0Rhc2hib2FyZDtcclxuICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgXCJjdXN0b21lclwiOiB1c2VyLFxyXG4gICAgICAgIFwiYXBwX21hc3RlclwiOiBhcHBcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmFwcEF0dGFjaEFuZERpc2F0dGFjaFRvRGFzaGJvYXJkKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWFyY2hMb2NhdGlvbigpIHtcclxuICAgIHZhciBvcHRpb24gPSB7XHJcbiAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTG9jYXRpb25Nb2RhbENvbXBvbmVudCwgb3B0aW9uKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICBpZiAocmVzLmN1cnJlbnQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBcIkN1cnJlbnQgTG9jYXRpb25cIjtcclxuICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzLnBsYWNlLmxhdGl0dWRlO1xyXG4gICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLnBsYWNlLmxvbmdpdHVkZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChyZXMuY3VycmVudCA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSByZXMucGxhY2UubmFtZTtcclxuICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzLnBsYWNlLmxhdGl0dWRlO1xyXG4gICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLnBsYWNlLmxvbmdpdHVkZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9uQ2F0ZWdvcnlDaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9ICcnO1xyXG4gICAgdmFyIFNlbGVjdGVkQ2F0OiBhbnkgPSBbXTtcclxuICAgIGFyZ3Muc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgU2VsZWN0ZWRDYXQucHVzaChlbGVtZW50LmlkKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ID0gU2VsZWN0ZWRDYXQudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaEFwcExpc3QoKSB7XHJcbiAgICBsZXQgcGFyYW1zID0gJyc7XHJcbiAgICBpZiAodGhpcy5sb2NhdGlvbiAhPSAnJyAmJiB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ICE9ICcnKSB7XHJcbiAgICAgIHBhcmFtcyA9ICc/bGF0aXR1ZGU9JyArIHRoaXMubGF0aXR1ZGUgKyAnJmxvbmdpdHVkZT0nICsgdGhpcy5sb25naXR1ZGUgKyAnJmNhdGVnb3J5PScgKyB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5sb2NhdGlvbiA9PSAnJyAmJiB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ICE9ICcnKSB7XHJcbiAgICAgIHBhcmFtcyA9ICc/Y2F0ZWdvcnk9JyArIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9sYXRpdHVkZT0nICsgdGhpcy5sYXRpdHVkZSArICcmbG9uZ2l0dWRlPScgKyB0aGlzLmxvbmdpdHVkZTtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0QWxsQXBwTGlzdChwYXJhbXMpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9saXN0ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMudXNlcl9hcHBfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy51c2VyX2FwcF9saXN0LmZpbmRJbmRleCh5ID0+IHkuaWQgPT0geC5pZClcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXBwX2xpc3QucHVzaCh4KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hcHBfbGlzdC5wdXNoKHgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHNlYXJjaCgpIHtcclxuICAgIHRoaXMuc2VhcmNoQXBwTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gaHR0cDovLzE5Mi4xNjguMjQuMjA4OjgwMDAvc2VhcmNoX2FwcC8/bGF0aXR1ZGU9MjIuNTQwMjYwMiZsb25naXR1ZGU9ODguMzgyMTk4OVxyXG59Il19