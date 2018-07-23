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
                console.log(_this.items);
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
            _this.params.closeCallback(location);
            // alert(this.currentGeoLocation)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQUM1RSwrREFBOEQ7QUFDOUQsbUdBQW1GO0FBQ25GLElBQUksT0FBTyxHQUFHLHlDQUF5QyxDQUFDO0FBQ3hELElBQUksd0JBQXdCLEdBQUcsSUFBSSxrRUFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSw2QkFBK0I7QUFDL0IsNENBQW9FO0FBR3BFLHNEQUF3RDtBQVF4RDtJQUE0QywwQ0FBVTtJQUtsRCxnQ0FDWSxNQUF5QjtRQURyQyxZQUdJLGlCQUFPLFNBb0JWO1FBdEJXLFlBQU0sR0FBTixNQUFNLENBQW1CO1FBSnJDLGlCQUFXLEdBQUcsSUFBSSxjQUFPLEVBQVUsQ0FBQztRQU9oQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDakIsd0JBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsZ0NBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQ1AsVUFBQyxNQUFXO1lBQ1Isd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsSUFBSSxDQUFDLFVBQUMsTUFBVztnQkFDZCxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNCLENBQUMsRUFBRSxDQUFDLFVBQUEsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLEVBRUQsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQ0osQ0FBQzs7SUFDTixDQUFDO0lBRUQsdURBQXNCLEdBQXRCO1FBQUEsaUJBUUM7UUFQRyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBWSxHQUFaO1FBQUEsaUJBWUM7UUFYRyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQUEsUUFBUTtZQUM5QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLGlDQUFpQztRQUNyQyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsRUFBRTtZQUNLLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDO1NBQzlCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx5Q0FBUSxHQUFSLFVBQVMsS0FBSztRQUFkLGlCQVFDO1FBUEcsd0JBQXdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO1lBQzVELHVJQUF1STtZQUN2SSw4QkFBOEI7WUFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsbURBQWtCLEdBQWxCLFVBQW1CLElBQWU7UUFDOUIsSUFBSSxZQUFZLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN6QyxJQUFJLENBQUMsV0FBVzthQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELGdEQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUdELHNDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUE3RVEsc0JBQXNCO1FBUGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7eUNBUXNCLDJCQUFpQjtPQU41QixzQkFBc0IsQ0ErRWxDO0lBQUQsNkJBQUM7Q0FBQSxBQS9FRCxDQUE0Qyx1QkFBVSxHQStFckQ7QUEvRVksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1wbGFjZXMtYXV0b2NvbXBsZXRlJztcclxubGV0IEFQSV9LRVkgPSBcIkFJemFTeUIzRktiYXFvbm1ZLWJEUGFuYnpKU0g5VTdIWEY4ZHBTNFwiO1xyXG5sZXQgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlID0gbmV3IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZShBUElfS0VZKTtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAqIGFzIGdlb0xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJsb2NhdGlvbi1tb2RhbFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcImxvY2F0aW9uLW1vZGFsLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImxvY2F0aW9uLW1vZGFsLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhdGlvbk1vZGFsQ29tcG9uZW50IGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGU6IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZTtcclxuICAgIHNlYXJjaElucHV0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gICAgaXRlbXM7XHJcbiAgICBjdXJyZW50R2VvTG9jYXRpb246IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtc1xyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNlYXJjaElucHV0LnBpcGUoXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxyXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwYXJhbXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlLnNlYXJjaChwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHBsYWNlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHBsYWNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtcylcclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUxvY2F0aW9uU2VydmljZXMoKTogdm9pZCB7XHJcbiAgICAgICAgZ2VvTG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihlbmFibGVkID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBnZW9Mb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHRoaXMuc2hvd0xvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dMb2NhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBnZW9Mb2NhdGlvbi53YXRjaExvY2F0aW9uKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50R2VvTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuY3VycmVudEdlb0xvY2F0aW9uKVxyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwICogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGFjZShwbGFjZSkge1xyXG4gICAgICAgIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZS5nZXRQbGFjZUJ5SWQocGxhY2UucGxhY2VJZCkudGhlbigocGxhY2UpID0+IHtcclxuICAgICAgICAgICAgLy8gZGlhbG9ncy5hbGVydChcIkZybWF0dGVkIGFkZHJlc3MgOlwiICsgcGxhY2UuZm9ybWF0dGVkQWRkcmVzcyArIFwiXFxuIGxhdGl0dWRlOiBcIiArIHBsYWNlLmxhdGl0dWRlICsgXCJcXG4gbG9uZ2l0dWRlOiBcIiArIHBsYWNlLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socGxhY2UpO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hGaWVsZENoYW5nZWQoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdmFyIHRtcHRleHRmaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3RcclxuICAgICAgICB0aGlzLnNlYXJjaElucHV0XHJcbiAgICAgICAgICAgIC5uZXh0KHRtcHRleHRmaWVsZC50ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQbGFjZSh0aGlzLml0ZW1zW2FyZ3MuaW5kZXhdKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IFwiY2xvc2VcIjogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=