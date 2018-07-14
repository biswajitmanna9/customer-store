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
var ExploreComponent = /** @class */ (function (_super) {
    __extends(ExploreComponent, _super);
    function ExploreComponent(exploreService) {
        var _this = _super.call(this) || this;
        _this.exploreService = exploreService;
        _this.category_list = [];
        _this.app_list = [];
        _this.selected_category = '';
        _this.location = '';
        _this.searchInput = new rxjs_1.Subject();
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
    ExploreComponent.prototype.addToDashboard = function (args, id) {
        var val = args.object;
        if (val.checked) {
        }
        else {
        }
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
        __metadata("design:paramtypes", [explore_service_1.ExploreService])
    ], ExploreComponent);
    return ExploreComponent;
}(observable_1.Observable));
exports.ExploreComponent = ExploreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBRXBELHVFQUFxRTtBQUNyRSwrREFBOEQ7QUFDOUQsbUdBQW1GO0FBRW5GLDZCQUErQjtBQUMvQiw0Q0FBb0U7QUFTcEUscURBQXVEO0FBRXZELHNDQUE4RDtBQUM5RCxJQUFJLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQztBQUN4RCxJQUFJLHdCQUF3QixHQUFHLElBQUksa0VBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFPckU7SUFBc0Msb0NBQVU7SUFZOUMsMEJBQ1UsY0FBOEI7UUFEeEMsWUFHRSxpQkFBTyxTQXNCUjtRQXhCUyxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFaeEMsbUJBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQix1QkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUl0QixpQkFBVyxHQUFHLElBQUksY0FBTyxFQUFVLENBQUM7UUFRbEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLHdCQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLGdDQUFvQixFQUFFLENBQ3ZCLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVztZQUN0Qix1REFBdUQ7WUFDdkQsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDcEMsSUFBSSxDQUFDLFVBQUMsTUFBVztnQkFDaEIsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUNwQixLQUFJ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YyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBaEl3QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBcUIsaUJBQVU7eURBQUM7SUFWN0MsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQWMwQixnQ0FBYztPQWI3QixnQkFBZ0IsQ0E2STVCO0lBQUQsdUJBQUM7Q0FBQSxBQTdJRCxDQUFzQyx1QkFBVSxHQTZJL0M7QUE3SVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSXRlbUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xyXG5cclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XHJcbmltcG9ydCB7IEZpbHRlclNlbGVjdCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1maWx0ZXItc2VsZWN0JztcclxucmVnaXN0ZXJFbGVtZW50KCdGaWx0ZXJTZWxlY3QnLCAoKSA9PiBGaWx0ZXJTZWxlY3QpO1xyXG5cclxuaW1wb3J0IHsgRXhwbG9yZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9leHBsb3JlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1wbGFjZXMtYXV0b2NvbXBsZXRlJztcclxuXHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7XHJcbiAgRXZlbnREYXRhLFxyXG59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcclxuaW1wb3J0ICogYXMgcGFnZXMgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlJztcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5sZXQgQVBJX0tFWSA9IFwiQUl6YVN5QjNGS2JhcW9ubVktYkRQYW5iekpTSDlVN0hYRjhkcFM0XCI7XHJcbmxldCBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUgPSBuZXcgR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlKEFQSV9LRVkpO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJleHBsb3JlXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2V4cGxvcmUuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9leHBsb3JlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gIGFwcF9saXN0OiBhbnkgPSBbXTtcclxuICBzZWxlY3RlZF9jYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcbiAgbG9jYXRpb246IHN0cmluZyA9ICcnO1xyXG4gIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZTogR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlO1xyXG4gIHBhZ2U6IFBhZ2U7XHJcbiAgZXZlbnRzO1xyXG4gIHNlYXJjaElucHV0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gIGl0ZW1zO1xyXG4gIEBWaWV3Q2hpbGQoJ3BsYWNlc0xpc3QnKSBwdWJsaWMgcGxhY2VzX2xpc3Q6IEVsZW1lbnRSZWY7XHJcbiAgcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBleHBsb3JlU2VydmljZTogRXhwbG9yZVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0LnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSg1MDApLFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICApLnN1YnNjcmliZSgocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgLy8gbGV0IGxpc3QgPSA8TGlzdFZpZXc+dGhpcy5wbGFjZXNfbGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUuc2VhcmNoKHBhcmFtcylcclxuICAgICAgICAudGhlbigocGxhY2VzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBwbGFjZXM7XHJcbiAgICAgICAgICB0aGlzLnNldCgnaXRlbXMnLCB0aGlzLml0ZW1zKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpXHJcbiAgICAgICAgICAvLyBsaXN0Lml0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICAgIC8vIGxpc3QucmVmcmVzaCgpO1xyXG4gICAgICAgIH0sIChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAgICxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XHJcbiAgICB0aGlzLmdldE1vc3RWaWV3QXBwTGlzdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGdldFBsYWNlKHBsYWNlKSB7XHJcbiAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUuZ2V0UGxhY2VCeUlkKHBsYWNlLnBsYWNlSWQpLnRoZW4oKHBsYWNlKSA9PiB7XHJcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJGcm1hdHRlZCBhZGRyZXNzIDpcIiArIHBsYWNlLmZvcm1hdHRlZEFkZHJlc3MgKyBcIlxcbiBsYXRpdHVkZTogXCIgKyBwbGFjZS5sYXRpdHVkZSArIFwiXFxuIGxvbmdpdHVkZTogXCIgKyBwbGFjZS5sb25naXR1ZGUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlYXJjaEZpZWxkQ2hhbmdlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHZhciB0bXB0ZXh0ZmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0XHJcbiAgICB0aGlzLnNlYXJjaElucHV0XHJcbiAgICAgIC5uZXh0KHRtcHRleHRmaWVsZC50ZXh0KVxyXG4gIH1cclxuXHJcbiAgbGlzdFZpZXdJdGVtVGFwKGFyZ3MpIHtcclxuICAgIHRoaXMuZ2V0UGxhY2UodGhpcy5pdGVtc1thcmdzLmluZGV4XSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3J5TGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0Q2F0ZWdvcnlMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0TW9zdFZpZXdBcHBMaXN0KCkge1xyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRNb3N0Vmlld0FwcExpc3QoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBfbGlzdCA9IHJlcztcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKGFyZ3M6IEl0ZW1FdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdJdGVtIHdpdGggaW5kZXg6ICcgKyBhcmdzLmluZGV4ICsgJyB0YXBwZWQnKTtcclxuICB9XHJcblxyXG4gIGFkZFRvRGFzaGJvYXJkKGFyZ3MsIGlkKSB7XHJcbiAgICBsZXQgdmFsID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcclxuICAgIGlmICh2YWwuY2hlY2tlZCkge1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBvbkNhdGVnb3J5Q2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgPSAnJztcclxuICAgIHZhciBTZWxlY3RlZENhdDogYW55ID0gW107XHJcbiAgICBhcmdzLnNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIFNlbGVjdGVkQ2F0LnB1c2goZWxlbWVudC5pZClcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9IFNlbGVjdGVkQ2F0LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hBcHBMaXN0KCkge1xyXG4gICAgbGV0IHBhcmFtcyA9ICcnO1xyXG4gICAgaWYgKHRoaXMubG9jYXRpb24gIT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSAhPSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP3NlYXJjaD0nICsgdGhpcy5sb2NhdGlvbiArICcmY2F0ZWdvcnk9JyArIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmxvY2F0aW9uID09ICcnICYmIHRoaXMuc2VsZWN0ZWRfY2F0ZWdvcnkgIT0gJycpIHtcclxuICAgICAgcGFyYW1zID0gJz9jYXRlZ29yeT0nICsgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubG9jYXRpb24gIT0gJycgJiYgdGhpcy5zZWxlY3RlZF9jYXRlZ29yeSA9PSAnJykge1xyXG4gICAgICBwYXJhbXMgPSAnP3NlYXJjaD0nICsgdGhpcy5sb2NhdGlvbjtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0QWxsQXBwTGlzdChwYXJhbXMpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9saXN0ID0gcmVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlYXJjaEFwcExpc3QoKTtcclxuICB9XHJcblxyXG5cclxufSJdfQ==