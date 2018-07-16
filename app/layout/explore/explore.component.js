"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_filter_select_1 = require("nativescript-filter-select");
element_registry_1.registerElement('FilterSelect', function () { return nativescript_filter_select_1.FilterSelect; });
var explore_service_1 = require("../../core/services/explore.service");
var observable_1 = require("tns-core-modules/data/observable");
var nativescript_google_places_autocomplete_1 = require("nativescript-google-places-autocomplete");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dialogs = require("tns-core-modules/ui/dialogs");
var core_2 = require("@angular/core");
var API_KEY = "AIzaSyB3FKbaqonmY-bDPanbzJSH9U7HXF8dpS4";
var googlePlacesAutocomplete = new nativescript_google_places_autocomplete_1.GooglePlacesAutocomplete(API_KEY);
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var login_modal_component_1 = require("../../core/component/login-modal/login-modal.component");
var signup_modal_component_1 = require("../../core/component/signup-modal/signup-modal.component");
var application_settings_1 = require("application-settings");
var ExploreComponent = /** @class */ (function (_super) {
    __extends(ExploreComponent, _super);
    function ExploreComponent(exploreService, modal, vcRef) {
        var _this = _super.call(this) || this;
        _this.exploreService = exploreService;
        _this.modal = modal;
        _this.vcRef = vcRef;
        _this.category_list = [];
        _this.app_list = [];
        _this.selected_category = '';
        _this.location = '';
        _this.searchInput = new rxjs_1.Subject();
        _this.options = {
            context: {},
            fullscreen: false,
            viewContainerRef: _this.vcRef
        };
        _this.searchInput.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe(function (params) {
            // let list = <ListView>this.places_list.nativeElement;
            googlePlacesAutocomplete.search(params)
                .then(function (places) {
                _this.items = [];
                _this.items = places;
                _this.set('items', _this.items);
                console.log(_this.items);
                // list.items = this.items;
                // list.refresh();
            }, (function (error) {
                console.log(error);
            }));
        }, function (error) {
            console.log(error);
        });
        return _this;
    }
    ExploreComponent.prototype.ngOnInit = function () {
        this.getCategoryList();
        this.getMostViewAppList();
    };
    ExploreComponent.prototype.getPlace = function (place) {
        googlePlacesAutocomplete.getPlaceById(place.placeId).then(function (place) {
            dialogs.alert("Frmatted address :" + place.formattedAddress + "\n latitude: " + place.latitude + "\n longitude: " + place.longitude)
                .then(function () { });
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.searchFieldChanged = function (args) {
        var tmptextfield = args.object;
        this.searchInput
            .next(tmptextfield.text);
    };
    ExploreComponent.prototype.listViewItemTap = function (args) {
        this.getPlace(this.items[args.index]);
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
            _this.app_list = res;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.onItemTap = function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
    };
    ExploreComponent.prototype.openLoginModal = function () {
        var _this = this;
        this.modal.showModal(login_modal_component_1.LoginModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res.signup) {
                _this.openSignupModal();
            }
        });
    };
    ExploreComponent.prototype.openSignupModal = function () {
        var _this = this;
        this.modal.showModal(signup_modal_component_1.SignUpModalComponent, this.options).then(function (res) {
            console.log(res);
            if (res.signin) {
                _this.openLoginModal();
            }
        });
    };
    ExploreComponent.prototype.addToDashboard = function (args, id) {
        if (!application_settings_1.getBoolean('isLoggedin')) {
            this.openLoginModal();
        }
        else {
        }
        // dialogs.login({
        //   title: "Login",
        //   message: "Login into your account",
        //   okButtonText: "Sign In",
        //   cancelButtonText: "Cancel",
        //   neutralButtonText: "Sign Up",
        //   userName: "",
        //   password: ""
        // }).then(r => {
        //   console.log("Dialog result: " + r.result + ", user: " + r.userName + ", pwd: " + r.password);
        // });
        // let val = <Switch>args.object;
        // if (val.checked) {
        // } else {
        // }
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
            params = '?search=' + this.location + '&category=' + this.selected_category;
        }
        else if (this.location == '' && this.selected_category != '') {
            params = '?category=' + this.selected_category;
        }
        else if (this.location != '' && this.selected_category == '') {
            params = '?search=' + this.location;
        }
        this.exploreService.getAllAppList(params).subscribe(function (res) {
            _this.app_list = res;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.search = function () {
        this.searchAppList();
    };
    __decorate([
        core_2.ViewChild('placesList'),
        __metadata("design:type", core_2.ElementRef)
    ], ExploreComponent.prototype, "places_list", void 0);
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
}(observable_1.Observable));
exports.ExploreComponent = ExploreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUlwRSwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBRXBELHVFQUFxRTtBQUNyRSwrREFBOEQ7QUFDOUQsbUdBQW1GO0FBRW5GLDZCQUErQjtBQUMvQiw0Q0FBb0U7QUFTcEUscURBQXVEO0FBRXZELHNDQUE4RDtBQUM5RCxJQUFJLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQztBQUN4RCxJQUFJLHdCQUF3QixHQUFHLElBQUksa0VBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckUsbUVBQTZFO0FBQzdFLGdHQUE2RjtBQUM3RixtR0FBZ0c7QUFDaEcsNkRBQTJGO0FBTzNGO0lBQXNDLG9DQUFVO0lBaUI5QywwQkFDVSxjQUE4QixFQUM5QixLQUF5QixFQUN6QixLQUF1QjtRQUhqQyxZQUtFLGlCQUFPLFNBc0JSO1FBMUJTLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFrQjtRQW5CakMsbUJBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQix1QkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUl0QixpQkFBVyxHQUFHLElBQUksY0FBTyxFQUFVLENBQUM7UUFFcEMsYUFBTyxHQUFHO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsS0FBSztZQUNqQixnQkFBZ0IsRUFBRSxLQUFJLENBQUMsS0FBSztTQUM3QixDQUFDO1FBU0EsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLHdC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QUFDLENBQUM7WUFDN0QsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBdEt3QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBcUIsaUJBQVU7eURBQUM7SUFmN0MsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQW1CMEIsZ0NBQWM7WUFDdkIsNEJBQWtCO1lBQ2xCLHVCQUFnQjtPQXBCdEIsZ0JBQWdCLENBd0w1QjtJQUFELHVCQUFDO0NBQUEsQUF4TEQsQ0FBc0MsdUJBQVUsR0F3TC9DO0FBeExZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZWxlY3QgfSBmcm9tICduYXRpdmVzY3JpcHQtZmlsdGVyLXNlbGVjdCc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnRmlsdGVyU2VsZWN0JywgKCkgPT4gRmlsdGVyU2VsZWN0KTtcclxuXHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtcGxhY2VzLWF1dG9jb21wbGV0ZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQge1xyXG4gIEV2ZW50RGF0YSxcclxufSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAqIGFzIHBhZ2VzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzJztcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxubGV0IEFQSV9LRVkgPSBcIkFJemFTeUIzRktiYXFvbm1ZLWJEUGFuYnpKU0g5VTdIWEY4ZHBTNFwiO1xyXG5sZXQgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlID0gbmV3IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZShBUElfS0VZKTtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29yZS9jb21wb25lbnQvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnblVwTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9zaWdudXAtbW9kYWwvc2lnbnVwLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCBnZXRCb29sZWFuLCBzZXRCb29sZWFuLCBjbGVhciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJleHBsb3JlXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2V4cGxvcmUuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9leHBsb3JlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gIGFwcF9saXN0OiBhbnkgPSBbXTtcclxuICBzZWxlY3RlZF9jYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcbiAgbG9jYXRpb246IHN0cmluZyA9ICcnO1xyXG4gIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZTogR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlO1xyXG4gIHBhZ2U6IFBhZ2U7XHJcbiAgZXZlbnRzO1xyXG4gIHNlYXJjaElucHV0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gIGl0ZW1zO1xyXG4gIG9wdGlvbnMgPSB7XHJcbiAgICBjb250ZXh0OiB7fSxcclxuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gIH07XHJcbiAgQFZpZXdDaGlsZCgncGxhY2VzTGlzdCcpIHB1YmxpYyBwbGFjZXNfbGlzdDogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4cGxvcmVTZXJ2aWNlOiBFeHBsb3JlU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWZcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0LnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSg1MDApLFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICApLnN1YnNjcmliZSgocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgLy8gbGV0IGxpc3QgPSA8TGlzdFZpZXc+dGhpcy5wbGFjZXNfbGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUuc2VhcmNoKHBhcmFtcylcclxuICAgICAgICAudGhlbigocGxhY2VzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBwbGFjZXM7XHJcbiAgICAgICAgICB0aGlzLnNldCgnaXRlbXMnLCB0aGlzLml0ZW1zKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpXHJcbiAgICAgICAgICAvLyBsaXN0Lml0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICAgIC8vIGxpc3QucmVmcmVzaCgpO1xyXG4gICAgICAgIH0sIChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAgICxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XHJcbiAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGdldFBsYWNlKHBsYWNlKSB7XHJcbiAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUuZ2V0UGxhY2VCeUlkKHBsYWNlLnBsYWNlSWQpLnRoZW4oKHBsYWNlKSA9PiB7XHJcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJGcm1hdHRlZCBhZGRyZXNzIDpcIiArIHBsYWNlLmZvcm1hdHRlZEFkZHJlc3MgKyBcIlxcbiBsYXRpdHVkZTogXCIgKyBwbGFjZS5sYXRpdHVkZSArIFwiXFxuIGxvbmdpdHVkZTogXCIgKyBwbGFjZS5sb25naXR1ZGUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlYXJjaEZpZWxkQ2hhbmdlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHZhciB0bXB0ZXh0ZmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0XHJcbiAgICB0aGlzLnNlYXJjaElucHV0XHJcbiAgICAgIC5uZXh0KHRtcHRleHRmaWVsZC50ZXh0KVxyXG4gIH1cclxuXHJcbiAgbGlzdFZpZXdJdGVtVGFwKGFyZ3MpIHtcclxuICAgIHRoaXMuZ2V0UGxhY2UodGhpcy5pdGVtc1thcmdzLmluZGV4XSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0Q2F0ZWdvcnlMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0TW9zdFZpZXdBcHBMaXN0KCkge1xyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRNb3N0Vmlld0FwcExpc3QoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKGFyZ3M6IEl0ZW1FdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdJdGVtIHdpdGggaW5kZXg6ICcgKyBhcmdzLmluZGV4ICsgJyB0YXBwZWQnKTtcclxuICB9XHJcblxyXG4gIG9wZW5Mb2dpbk1vZGFsKCkge1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTG9naW5Nb2RhbENvbXBvbmVudCwgdGhpcy5vcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIGlmIChyZXMuc2lnbnVwKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuU2lnbnVwTW9kYWwoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9wZW5TaWdudXBNb2RhbCgpIHtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNpZ25VcE1vZGFsQ29tcG9uZW50LCB0aGlzLm9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgaWYgKHJlcy5zaWduaW4pIHtcclxuICAgICAgICB0aGlzLm9wZW5Mb2dpbk1vZGFsKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhZGRUb0Rhc2hib2FyZChhcmdzLCBpZCkge1xyXG4gICAgaWYgKCFnZXRCb29sZWFuKCdpc0xvZ2dlZGluJykpIHtcclxuICAgICAgdGhpcy5vcGVuTG9naW5Nb2RhbCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRpYWxvZ3MubG9naW4oe1xyXG4gICAgLy8gICB0aXRsZTogXCJMb2dpblwiLFxyXG4gICAgLy8gICBtZXNzYWdlOiBcIkxvZ2luIGludG8geW91ciBhY2NvdW50XCIsXHJcbiAgICAvLyAgIG9rQnV0dG9uVGV4dDogXCJTaWduIEluXCIsXHJcbiAgICAvLyAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAvLyAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIlNpZ24gVXBcIixcclxuICAgIC8vICAgdXNlck5hbWU6IFwiXCIsXHJcbiAgICAvLyAgIHBhc3N3b3JkOiBcIlwiXHJcbiAgICAvLyB9KS50aGVuKHIgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgci5yZXN1bHQgKyBcIiwgdXNlcjogXCIgKyByLnVzZXJOYW1lICsgXCIsIHB3ZDogXCIgKyByLnBhc3N3b3JkKTtcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gbGV0IHZhbCA9IDxTd2l0Y2g+YXJncy5vYmplY3Q7XHJcbiAgICAvLyBpZiAodmFsLmNoZWNrZWQpIHtcclxuXHJcbiAgICAvLyB9IGVsc2Uge1xyXG5cclxuICAgIC8vIH1cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25DYXRlZ29yeUNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ID0gJyc7XHJcbiAgICB2YXIgU2VsZWN0ZWRDYXQ6IGFueSA9IFtdO1xyXG4gICAgYXJncy5zZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBTZWxlY3RlZENhdC5wdXNoKGVsZW1lbnQuaWQpXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPSBTZWxlY3RlZENhdC50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoQXBwTGlzdCgpIHtcclxuICAgIGxldCBwYXJhbXMgPSAnJztcclxuICAgIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgIT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9zZWFyY2g9JyArIHRoaXMubG9jYXRpb24gKyAnJmNhdGVnb3J5PScgKyB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5sb2NhdGlvbiA9PSAnJyAmJiB0aGlzLnNlbGVjdGVkX2NhdGVnb3J5ICE9ICcnKSB7XHJcbiAgICAgIHBhcmFtcyA9ICc/Y2F0ZWdvcnk9JyArIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmxvY2F0aW9uICE9ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9zZWFyY2g9JyArIHRoaXMubG9jYXRpb247XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldEFsbEFwcExpc3QocGFyYW1zKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWFyY2hBcHBMaXN0KCk7XHJcbiAgfVxyXG5cclxuXHJcbn0iXX0=