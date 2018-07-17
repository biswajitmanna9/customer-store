"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var observable_1 = require("tns-core-modules/data/observable");
var nativescript_google_places_autocomplete_1 = require("nativescript-google-places-autocomplete");
var API_KEY = "AIzaSyB3FKbaqonmY-bDPanbzJSH9U7HXF8dpS4";
var googlePlacesAutocomplete = new nativescript_google_places_autocomplete_1.GooglePlacesAutocomplete(API_KEY);
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var geoLocation = require("nativescript-geolocation");
var LocationModalComponent = /** @class */ (function (_super) {
    __extends(LocationModalComponent, _super);
    function LocationModalComponent(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        _this.searchInput = new rxjs_1.Subject();
        _this.searchInput.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe(function (params) {
            googlePlacesAutocomplete.search(params)
                .then(function (places) {
                _this.items = [];
                _this.items = places;
                // console.log(this.items)
            }, (function (error) {
                console.log(error);
            }));
        }, function (error) {
            console.log(error);
        });
        return _this;
    }
    LocationModalComponent.prototype.enableLocationServices = function () {
        var _this = this;
        geoLocation.isEnabled().then(function (enabled) {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(function () { return _this.showLocation(); });
            }
            else {
                _this.showLocation();
            }
        });
    };
    LocationModalComponent.prototype.showLocation = function () {
        var _this = this;
        geoLocation.watchLocation(function (location) {
            _this.currentGeoLocation = location;
            alert(_this.currentGeoLocation);
        }, function (error) {
            alert(error);
        }, {
            desiredAccuracy: 3,
            updateDistance: 10,
            minimumUpdateTime: 1000 * 1
        });
    };
    LocationModalComponent.prototype.getPlace = function (place) {
        var _this = this;
        googlePlacesAutocomplete.getPlaceById(place.placeId).then(function (place) {
            // dialogs.alert("Frmatted address :" + place.formattedAddress + "\n latitude: " + place.latitude + "\n longitude: " + place.longitude)
            //     .then(function () { });
            _this.params.closeCallback(place);
        }, function (error) {
            console.log(error);
        });
    };
    LocationModalComponent.prototype.searchFieldChanged = function (args) {
        var tmptextfield = args.object;
        this.searchInput
            .next(tmptextfield.text);
    };
    LocationModalComponent.prototype.listViewItemTap = function (args) {
        this.getPlace(this.items[args.index]);
    };
    LocationModalComponent.prototype.close = function () {
        this.params.closeCallback({ "close": true });
    };
    LocationModalComponent = __decorate([
        core_1.Component({
            selector: "location-modal",
            moduleId: module.id,
            templateUrl: "location-modal.component.html",
            styleUrls: ["location-modal.component.css"]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], LocationModalComponent);
    return LocationModalComponent;
}(observable_1.Observable));
exports.LocationModalComponent = LocationModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQUM1RSwrREFBOEQ7QUFDOUQsbUdBQW1GO0FBQ25GLElBQUksT0FBTyxHQUFHLHlDQUF5QyxDQUFDO0FBQ3hELElBQUksd0JBQXdCLEdBQUcsSUFBSSxrRUFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSw2QkFBK0I7QUFDL0IsNENBQW9FO0FBR3BFLHNEQUF3RDtBQVF4RDtJQUE0QywwQ0FBVTtJQUtsRCxnQ0FDWSxNQUF5QjtRQURyQyxZQUdJLGlCQUFPLFNBb0JWO1FBdEJXLFlBQU0sR0FBTixNQUFNLENBQW1CO1FBSnJDLGlCQUFXLEdBQUcsSUFBSSxjQUFPLEVBQVUsQ0FBQztRQU9oQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDakIsd0JBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsZ0NBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQ1AsVUFBQyxNQUFXO1lBQ1Isd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsSUFBSSxDQUFDLFVBQUMsTUFBVztnQkFDZCxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLDBCQUEwQjtZQUM5QixDQUFDLEVBQUUsQ0FBQyxVQUFBLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxFQUVELFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUNKLENBQUM7O0lBQ04sQ0FBQztJQUVELHVEQUFzQixHQUF0QjtRQUFBLGlCQVFDO1FBUEcsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkNBQVksR0FBWjtRQUFBLGlCQVdDO1FBVkcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFBLFFBQVE7WUFDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztZQUNuQyxLQUFLLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDbEMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLEVBQUU7WUFDSyxlQUFlLEVBQUUsQ0FBQztZQUNsQixjQUFjLEVBQUUsRUFBRTtZQUNsQixpQkFBaUIsRUFBRSxJQUFJLEdBQUcsQ0FBQztTQUM5QixDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQseUNBQVEsR0FBUixVQUFTLEtBQUs7UUFBZCxpQkFRQztRQVBHLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUM1RCx1SUFBdUk7WUFDdkksOEJBQThCO1lBQzlCLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG1EQUFrQixHQUFsQixVQUFtQixJQUFlO1FBQzlCLElBQUksWUFBWSxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDekMsSUFBSSxDQUFDLFdBQVc7YUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHRCxzQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBNUVRLHNCQUFzQjtRQVBsQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM5QyxDQUFDO3lDQVFzQiwyQkFBaUI7T0FONUIsc0JBQXNCLENBOEVsQztJQUFELDZCQUFDO0NBQUEsQUE5RUQsQ0FBNEMsdUJBQVUsR0E4RXJEO0FBOUVZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtcGxhY2VzLWF1dG9jb21wbGV0ZSc7XHJcbmxldCBBUElfS0VZID0gXCJBSXphU3lCM0ZLYmFxb25tWS1iRFBhbmJ6SlNIOVU3SFhGOGRwUzRcIjtcclxubGV0IGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZSA9IG5ldyBHb29nbGVQbGFjZXNBdXRvY29tcGxldGUoQVBJX0tFWSk7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBnZW9Mb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibG9jYXRpb24tbW9kYWxcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2NhdGlvbi1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJsb2NhdGlvbi1tb2RhbC5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYXRpb25Nb2RhbENvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlOiBHb29nbGVQbGFjZXNBdXRvY29tcGxldGU7XHJcbiAgICBzZWFyY2hJbnB1dCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICAgIGl0ZW1zO1xyXG4gICAgY3VycmVudEdlb0xvY2F0aW9uOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXNcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcclxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocGFyYW1zOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZS5zZWFyY2gocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChwbGFjZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBwbGFjZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVMb2NhdGlvblNlcnZpY2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGdlb0xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgZ2VvTG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB0aGlzLnNob3dMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TG9jYXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgZ2VvTG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEdlb0xvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuY3VycmVudEdlb0xvY2F0aW9uKVxyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwICogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGFjZShwbGFjZSkge1xyXG4gICAgICAgIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZS5nZXRQbGFjZUJ5SWQocGxhY2UucGxhY2VJZCkudGhlbigocGxhY2UpID0+IHtcclxuICAgICAgICAgICAgLy8gZGlhbG9ncy5hbGVydChcIkZybWF0dGVkIGFkZHJlc3MgOlwiICsgcGxhY2UuZm9ybWF0dGVkQWRkcmVzcyArIFwiXFxuIGxhdGl0dWRlOiBcIiArIHBsYWNlLmxhdGl0dWRlICsgXCJcXG4gbG9uZ2l0dWRlOiBcIiArIHBsYWNlLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socGxhY2UpO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hGaWVsZENoYW5nZWQoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdmFyIHRtcHRleHRmaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3RcclxuICAgICAgICB0aGlzLnNlYXJjaElucHV0XHJcbiAgICAgICAgICAgIC5uZXh0KHRtcHRleHRmaWVsZC50ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQbGFjZSh0aGlzLml0ZW1zW2FyZ3MuaW5kZXhdKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IFwiY2xvc2VcIjogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=