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
            _this.params.closeCallback({ place: location, current: true });
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
            _this.params.closeCallback({ place: place, current: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQUM1RSwrREFBOEQ7QUFDOUQsbUdBQW1GO0FBQ25GLElBQUksT0FBTyxHQUFHLHlDQUF5QyxDQUFDO0FBQ3hELElBQUksd0JBQXdCLEdBQUcsSUFBSSxrRUFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSw2QkFBK0I7QUFDL0IsNENBQW9FO0FBR3BFLHNEQUF3RDtBQVF4RDtJQUE0QywwQ0FBVTtJQUtsRCxnQ0FDWSxNQUF5QjtRQURyQyxZQUdJLGlCQUFPLFNBb0JWO1FBdEJXLFlBQU0sR0FBTixNQUFNLENBQW1CO1FBSnJDLGlCQUFXLEdBQUcsSUFBSSxjQUFPLEVBQVUsQ0FBQztRQU9oQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDakIsd0JBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsZ0NBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQ1AsVUFBQyxNQUFXO1lBQ1Isd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsSUFBSSxDQUFDLFVBQUMsTUFBVztnQkFDZCxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNCLENBQUMsRUFBRSxDQUFDLFVBQUEsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLEVBRUQsVUFBQSxLQUFLO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQ0osQ0FBQzs7SUFDTixDQUFDO0lBRUQsdURBQXNCLEdBQXRCO1FBQUEsaUJBUUM7UUFQRyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBWSxHQUFaO1FBQUEsaUJBV0M7UUFWRyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQUEsUUFBUTtZQUM5QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsRUFBRTtZQUNLLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDO1NBQzlCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx5Q0FBUSxHQUFSLFVBQVMsS0FBSztRQUFkLGlCQU1DO1FBTEcsd0JBQXdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO1lBQzVELEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxtREFBa0IsR0FBbEIsVUFBbUIsSUFBZTtRQUM5QixJQUFJLFlBQVksR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3pDLElBQUksQ0FBQyxXQUFXO2FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsZ0RBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBR0Qsc0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQTFFUSxzQkFBc0I7UUFQbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FRc0IsMkJBQWlCO09BTjVCLHNCQUFzQixDQTRFbEM7SUFBRCw2QkFBQztDQUFBLEFBNUVELENBQTRDLHVCQUFVLEdBNEVyRDtBQTVFWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBHb29nbGVQbGFjZXNBdXRvY29tcGxldGUgfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLXBsYWNlcy1hdXRvY29tcGxldGUnO1xyXG5sZXQgQVBJX0tFWSA9IFwiQUl6YVN5QjNGS2JhcW9ubVktYkRQYW5iekpTSDlVN0hYRjhkcFM0XCI7XHJcbmxldCBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUgPSBuZXcgR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlKEFQSV9LRVkpO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImxvY2F0aW9uLW1vZGFsXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwibG9jYXRpb24tbW9kYWwuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wibG9jYXRpb24tbW9kYWwuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvY2F0aW9uTW9kYWxDb21wb25lbnQgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZTogR29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlO1xyXG4gICAgc2VhcmNoSW5wdXQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgICBpdGVtcztcclxuICAgIGN1cnJlbnRHZW9Mb2NhdGlvbjogYW55O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQucGlwZShcclxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDUwMCksXHJcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgICApLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnb29nbGVQbGFjZXNBdXRvY29tcGxldGUuc2VhcmNoKHBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocGxhY2VzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gcGxhY2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlTG9jYXRpb25TZXJ2aWNlcygpOiB2b2lkIHtcclxuICAgICAgICBnZW9Mb2NhdGlvbi5pc0VuYWJsZWQoKS50aGVuKGVuYWJsZWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGdlb0xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4gdGhpcy5zaG93TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xvY2F0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGdlb0xvY2F0aW9uLndhdGNoTG9jYXRpb24obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRHZW9Mb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHtwbGFjZTogbG9jYXRpb24sY3VycmVudDogdHJ1ZX0pO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwICogMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGFjZShwbGFjZSkge1xyXG4gICAgICAgIGdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZS5nZXRQbGFjZUJ5SWQocGxhY2UucGxhY2VJZCkudGhlbigocGxhY2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7cGxhY2U6IHBsYWNlLGN1cnJlbnQ6IGZhbHNlfSk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaEZpZWxkQ2hhbmdlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgICAgICB2YXIgdG1wdGV4dGZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdFxyXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRcclxuICAgICAgICAgICAgLm5leHQodG1wdGV4dGZpZWxkLnRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdFZpZXdJdGVtVGFwKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLmdldFBsYWNlKHRoaXMuaXRlbXNbYXJncy5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgXCJjbG9zZVwiOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==