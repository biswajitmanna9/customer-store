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
        this.page = 0;
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
                _this.search();
            }
            else if (res.current == false) {
                _this.location = res.place.name;
                _this.latitude = res.place.latitude;
                _this.longitude = res.place.longitude;
                _this.search();
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
        this.search();
    };
    ExploreComponent.prototype.searchAppList = function () {
        var _this = this;
        var params = '';
        if (this.location != '' && this.selected_category != '') {
            params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&category=' + this.selected_category + '&page=' + this.page;
        }
        else if (this.location == '' && this.selected_category != '') {
            params = '?category=' + this.selected_category + '&page=' + this.page;
        }
        else if (this.location != '' && this.selected_category == '') {
            params = '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&page=' + this.page;
        }
        else {
            params = '?page=' + this.page;
        }
        this.exploreService.getAllAppList(params).subscribe(function (res) {
            _this.next_page = res.next;
            if (_this.page == 1) {
                _this.app_list = [];
            }
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
        this.loader.show(this.lodaing_options);
        this.page = 1;
        this.searchAppList();
    };
    ExploreComponent.prototype.onScroll = function (e) {
        if (this.next_page != null) {
            var num_arr = this.next_page.split('=');
            var count = +num_arr[num_arr.length - 1];
            if (this.page == count - 1) {
                this.page = count;
                this.searchAppList();
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBQ3BELHVFQUFxRTtBQUVyRSxtRUFBNkU7QUFDN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyx5R0FBc0c7QUFDdEcsNkRBQTJGO0FBQzNGLGlGQUFrRTtBQVFsRTtJQTBDRSwwQkFDVSxjQUE4QixFQUM5QixLQUF5QixFQUN6QixLQUF1QjtRQUZ2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUE1Q2pDLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsWUFBTyxHQUFHO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsS0FBSztZQUNqQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztTQUM3QixDQUFDO1FBRUYsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFHeEIsV0FBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztRQUNoQyxvQkFBZSxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFFLFVBQVUsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxD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QUFDO2dCQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBdFFzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtzREFBQztJQXRDakMsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQTRDMEIsZ0NBQWM7WUFDdkIsNEJBQWtCO1lBQ2xCLHVCQUFnQjtPQTdDdEIsZ0JBQWdCLENBK1M1QjtJQUFELHVCQUFDO0NBQUEsQUEvU0QsSUErU0M7QUEvU1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgRmlsdGVyU2VsZWN0IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWZpbHRlci1zZWxlY3QnO1xyXG5yZWdpc3RlckVsZW1lbnQoJ0ZpbHRlclNlbGVjdCcsICgpID0+IEZpbHRlclNlbGVjdCk7XHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduVXBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L3NpZ251cC1tb2RhbC9zaWdudXAtbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9jYXRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L2xvY2F0aW9uLW1vZGFsL2xvY2F0aW9uLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZXhwbG9yZVwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9leHBsb3JlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZXhwbG9yZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cGxvcmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gIGFwcF9saXN0OiBhbnkgPSBbXTtcclxuICBzZWxlY3RlZF9jYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcbiAgbG9jYXRpb246IHN0cmluZyA9ICcnO1xyXG4gIG9wdGlvbnMgPSB7XHJcbiAgICBjb250ZXh0OiB7fSxcclxuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gIH07XHJcbiAgdXNlcl9pZDogc3RyaW5nO1xyXG4gIHVzZXJfYXBwX2xpc3Q6IGFueSA9IFtdO1xyXG4gIGxhdGl0dWRlOiBhbnk7XHJcbiAgbG9uZ2l0dWRlOiBhbnk7XHJcbiAgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuICBsb2RhaW5nX29wdGlvbnMgPSB7XHJcbiAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXHJcbiAgICBwcm9ncmVzczogMC42NSxcclxuICAgIGFuZHJvaWQ6IHtcclxuICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcclxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgY2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uIChkaWFsb2cpIHsgY29uc29sZS5sb2coXCJMb2FkaW5nIGNhbmNlbGxlZFwiKSB9LFxyXG4gICAgICBtYXg6IDEwMCxcclxuICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgIHNlY29uZGFyeVByb2dyZXNzOiAxXHJcbiAgICB9LFxyXG4gICAgaW9zOiB7XHJcbiAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAgIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoaWRlQmV6ZWw6IHRydWUsXHJcbiAgICB9XHJcbiAgfVxyXG4gIEBWaWV3Q2hpbGQoJ215ZmlsdGVyJykgbXlmaWx0ZXI6IEVsZW1lbnRSZWY7XHJcbiAgcmF0aW5nOiBhbnkgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgcGFnZTogbnVtYmVyID0gMDtcclxuICBuZXh0X3BhZ2U6IHN0cmluZztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLmxvZGFpbmdfb3B0aW9ucyk7XHJcbiAgICB0aGlzLnVzZXJfaWQgPSBnZXRTdHJpbmcoJ3VzZXJfaWQnKTtcclxuICAgIGNvbnNvbGUubG9nKGdldFN0cmluZygndXNlcl9pZCcpKVxyXG4gICAgdGhpcy5nZXRDYXRlZ29yeUxpc3QoKTtcclxuXHJcbiAgICBpZiAodGhpcy51c2VyX2lkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmdldERhc2hib2FyZEFwcExpc3QoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldERhc2hib2FyZEFwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldFVzZXJEYXNoYm9hcmRBcHBMaXN0KHRoaXMudXNlcl9pZCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlcl9hcHBfbGlzdCA9IHJlc1snYXBwX21hc3RlciddXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0Q2F0ZWdvcnlMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAocmVzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0TW9zdFZpZXdBcHBMaXN0KCkge1xyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRNb3N0Vmlld0FwcExpc3QoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJfYXBwX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudXNlcl9hcHBfbGlzdC5maW5kSW5kZXgoeSA9PiB5LmlkID09IHguaWQpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICB4Wydpc0Rhc2hib2FyZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICB4Wydpc0Rhc2hib2FyZCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeFsnYXZnX3JhdGluZyddID0gTWF0aC5yb3VuZCh4WydhdmdfcmF0aW5nJ10pXHJcbiAgICAgICAgICAgIHRoaXMuYXBwX2xpc3QucHVzaCh4KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgeFsnYXZnX3JhdGluZyddID0gTWF0aC5yb3VuZCh4WydhdmdfcmF0aW5nJ10pXHJcbiAgICAgICAgICAgIHRoaXMuYXBwX2xpc3QucHVzaCh4KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcblxyXG4gIG9wZW5Mb2dpbk1vZGFsKGFwcF9pZCkge1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTG9naW5Nb2RhbENvbXBvbmVudCwgdGhpcy5vcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIGlmIChyZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHJlcy5zaWdudXApIHtcclxuICAgICAgICAgIHRoaXMub3BlblNpZ251cE1vZGFsKGFwcF9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcy5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICAgIHRoaXMudXNlcl9pZCA9IHJlcy51c2VyX2lkO1xyXG4gICAgICAgICAgdGhpcy5hcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwX2lkLCB0aGlzLnVzZXJfaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuYXBwX2xpc3QuZmluZEluZGV4KHggPT4geC5pZCA9PSBhcHBfaWQpO1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9wZW5TaWdudXBNb2RhbChhcHBfaWQpIHtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNpZ25VcE1vZGFsQ29tcG9uZW50LCB0aGlzLm9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgaWYgKHJlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAocmVzLnNpZ25pbikge1xyXG4gICAgICAgICAgdGhpcy5vcGVuTG9naW5Nb2RhbChhcHBfaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJfaWQgPSByZXMuaWQ7XHJcbiAgICAgICAgICB0aGlzLmFwcEF0dGFjaEFuZERpc2F0dGFjaChhcHBfaWQsIHRoaXMudXNlcl9pZClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hcHBfbGlzdC5maW5kSW5kZXgoeCA9PiB4LmlkID09IGFwcF9pZCk7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdFtpbmRleF0uaXNEYXNoYm9hcmQgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYWRkVG9EYXNoYm9hcmQoYXBwX2lkKSB7XHJcbiAgICBpZiAoIWdldEJvb2xlYW4oJ2lzTG9nZ2VkaW4nKSkge1xyXG4gICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKGFwcF9pZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hcHBBdHRhY2hBbmREaXNhdHRhY2goYXBwX2lkLCB0aGlzLnVzZXJfaWQpXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgYXBwQXR0YWNoQW5kRGlzYXR0YWNoKGFwcCwgdXNlcikge1xyXG4gICAgdGhpcy5sb2FkZXIuc2hvdyh0aGlzLmxvZGFpbmdfb3B0aW9ucyk7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFwcF9saXN0LmZpbmRJbmRleCh4ID0+IHguaWQgPT0gYXBwKVxyXG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgIHRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkID0gIXRoaXMuYXBwX2xpc3RbaW5kZXhdLmlzRGFzaGJvYXJkO1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBcImN1c3RvbWVyXCI6IHVzZXIsXHJcbiAgICAgICAgXCJhcHBfbWFzdGVyXCI6IGFwcFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuYXBwQXR0YWNoQW5kRGlzYXR0YWNoVG9EYXNoYm9hcmQoZGF0YSkuc3Vic2NyaWJlKFxyXG4gICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWFyY2hMb2NhdGlvbigpIHtcclxuICAgIHZhciBvcHRpb24gPSB7XHJcbiAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTG9jYXRpb25Nb2RhbENvbXBvbmVudCwgb3B0aW9uKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICBpZiAocmVzLmN1cnJlbnQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBcIkN1cnJlbnQgTG9jYXRpb25cIjtcclxuICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzLnBsYWNlLmxhdGl0dWRlO1xyXG4gICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLnBsYWNlLmxvbmdpdHVkZTtcclxuICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHJlcy5jdXJyZW50ID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlcy5wbGFjZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMucGxhY2UubGF0aXR1ZGU7XHJcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMucGxhY2UubG9uZ2l0dWRlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkNhdGVnb3J5Q2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPSAnJztcclxuICAgIHZhciBTZWxlY3RlZENhdDogYW55ID0gW107XHJcbiAgICBhcmdzLnNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIFNlbGVjdGVkQ2F0LnB1c2goZWxlbWVudC5pZClcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9IFNlbGVjdGVkQ2F0LnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLnNlYXJjaCgpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoQXBwTGlzdCgpIHtcclxuICAgIGxldCBwYXJhbXMgPSAnJztcclxuICAgIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgIT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9sYXRpdHVkZT0nICsgdGhpcy5sYXRpdHVkZSArICcmbG9uZ2l0dWRlPScgKyB0aGlzLmxvbmdpdHVkZSArICcmY2F0ZWdvcnk9JyArIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgKyAnJnBhZ2U9JyArIHRoaXMucGFnZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubG9jYXRpb24gPT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSAhPSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP2NhdGVnb3J5PScgKyB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ICsgJyZwYWdlPScgKyB0aGlzLnBhZ2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9sYXRpdHVkZT0nICsgdGhpcy5sYXRpdHVkZSArICcmbG9uZ2l0dWRlPScgKyB0aGlzLmxvbmdpdHVkZSArICcmcGFnZT0nICsgdGhpcy5wYWdlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHBhcmFtcyA9ICc/cGFnZT0nICsgdGhpcy5wYWdlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRBbGxBcHBMaXN0KHBhcmFtcykuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMubmV4dF9wYWdlID0gcmVzLm5leHQ7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSA9PSAxKSB7XHJcbiAgICAgICAgICB0aGlzLmFwcF9saXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVzZXJfYXBwX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmVzLnJlc3VsdHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy51c2VyX2FwcF9saXN0LmZpbmRJbmRleCh5ID0+IHkuaWQgPT0geC5pZClcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgeFsnaXNEYXNoYm9hcmQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHhbJ2F2Z19yYXRpbmcnXSA9IE1hdGgucm91bmQoeFsnYXZnX3JhdGluZyddKVxyXG4gICAgICAgICAgICB0aGlzLmFwcF9saXN0LnB1c2goeCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHhbJ2lzRGFzaGJvYXJkJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgeFsnYXZnX3JhdGluZyddID0gTWF0aC5yb3VuZCh4WydhdmdfcmF0aW5nJ10pXHJcbiAgICAgICAgICAgIHRoaXMuYXBwX2xpc3QucHVzaCh4KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmxvYWRlci5oaWRlKClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2FkZXIuaGlkZSgpXHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIHNlYXJjaCgpIHtcclxuICAgIHRoaXMubG9hZGVyLnNob3codGhpcy5sb2RhaW5nX29wdGlvbnMpO1xyXG4gICAgdGhpcy5wYWdlID0gMTtcclxuICAgIHRoaXMuc2VhcmNoQXBwTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgb25TY3JvbGwoZSkge1xyXG4gICAgaWYgKHRoaXMubmV4dF9wYWdlICE9IG51bGwpIHtcclxuICAgICAgdmFyIG51bV9hcnIgPSB0aGlzLm5leHRfcGFnZS5zcGxpdCgnPScpO1xyXG4gICAgICB2YXIgY291bnQgPSArbnVtX2FycltudW1fYXJyLmxlbmd0aCAtIDFdXHJcbiAgICAgIGlmICh0aGlzLnBhZ2UgPT0gY291bnQgLSAxKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gY291bnQ7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hBcHBMaXN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGh0dHA6Ly8xOTIuMTY4LjI0LjIwODo4MDAwL3NlYXJjaF9hcHAvP2xhdGl0dWRlPTIyLjU0MDI2MDImbG9uZ2l0dWRlPTg4LjM4MjE5ODlcclxufSJdfQ==