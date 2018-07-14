"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geoLocation = require("nativescript-geolocation");
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_filter_select_1 = require("nativescript-filter-select");
element_registry_1.registerElement('FilterSelect', function () { return nativescript_filter_select_1.FilterSelect; });
var explore_service_1 = require("../../core/services/explore.service");
// import { MapsAPILoader } from '@agm/core';
// import { } from '@types/googlemaps';
// import { ViewChild, ElementRef, NgZone } from '@angular/core';
var ExploreComponent = /** @class */ (function () {
    function ExploreComponent(exploreService) {
        this.exploreService = exploreService;
        // @ViewChild('search') public searchElement: ElementRef;
        this.category_list = [];
        this.app_list = [];
    }
    ExploreComponent.prototype.ngOnInit = function () {
        this.getCategoryList();
        this.getMostViewAppList();
        // this.mapsAPILoader.load().then(
        //   () => {
        //     let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        //     autocomplete.addListener("place_changed", () => {
        //       this.ngZone.run(() => {
        //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //         if (place.geometry === undefined || place.geometry === null) {
        //           return;
        //         }
        //       });
        //     });
        //   }
        // );
    };
    ExploreComponent.prototype.enableLocationServices = function () {
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
    ExploreComponent.prototype.showLocation = function () {
        var _this = this;
        geoLocation.watchLocation(function (location) {
            _this.currentGeoLocation = location;
        }, function (error) {
            alert(error);
        }, {
            desiredAccuracy: 3,
            updateDistance: 10,
            minimumUpdateTime: 1000 * 1
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
            _this.app_list = res;
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ExploreComponent.prototype.onItemTap = function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
    };
    ExploreComponent.prototype.addToDashboard = function (args) {
        var val = args.object;
        if (val.checked) {
        }
        else {
        }
    };
    ExploreComponent.prototype.onCategoryChange = function (args) {
        console.log(args.selected);
    };
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
}());
exports.ExploreComponent = ExploreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUF3RDtBQUN4RCxzQ0FBa0Q7QUFJbEQsMEVBQXdFO0FBQ3hFLHlFQUEwRDtBQUMxRCxrQ0FBZSxDQUFDLGNBQWMsRUFBRSxjQUFNLE9BQUEseUNBQVksRUFBWixDQUFZLENBQUMsQ0FBQztBQUVwRCx1RUFBcUU7QUFFckUsNkNBQTZDO0FBQzdDLHVDQUF1QztBQUN2QyxpRUFBaUU7QUFRakU7SUFLRSwwQkFDVSxjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFMeEMseURBQXlEO1FBQ3pELGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBUSxFQUFFLENBQUM7SUFRbkIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsa0NBQWtDO1FBQ2xDLFlBQVk7UUFDWix3SEFBd0g7UUFFeEgsd0RBQXdEO1FBQ3hELGdDQUFnQztRQUNoQywrRUFBK0U7UUFDL0UseUVBQXlFO1FBQ3pFLG9CQUFvQjtRQUNwQixZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixNQUFNO1FBQ04sS0FBSztJQUNQLENBQUM7SUFFRCxpREFBc0IsR0FBdEI7UUFBQSxpQkFRQztRQVBDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFBQSxpQkFVQztRQVRDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQSxRQUFRO1lBQ2hDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFDckMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLENBQUMsRUFBRTtZQUNDLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDO1NBQzVCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQ0FBZSxHQUFmO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FDN0MsVUFBQSxHQUFHO1lBQ0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFFRCw2Q0FBa0IsR0FBbEI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLENBQ2hELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQseUNBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVsQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixDQUFDO0lBQ0gsQ0FBQztJQUlELDJDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUEvRlUsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQU8wQixnQ0FBYztPQU43QixnQkFBZ0IsQ0FrRzVCO0lBQUQsdUJBQUM7Q0FBQSxBQWxHRCxJQWtHQztBQWxHWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBnZW9Mb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZWxlY3QgfSBmcm9tICduYXRpdmVzY3JpcHQtZmlsdGVyLXNlbGVjdCc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnRmlsdGVyU2VsZWN0JywgKCkgPT4gRmlsdGVyU2VsZWN0KTtcclxuXHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnQGFnbS9jb3JlJztcclxuLy8gaW1wb3J0IHsgfSBmcm9tICdAdHlwZXMvZ29vZ2xlbWFwcyc7XHJcbi8vIGltcG9ydCB7IFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJleHBsb3JlXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2V4cGxvcmUuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFsnLi9leHBsb3JlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwbG9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy8gQFZpZXdDaGlsZCgnc2VhcmNoJykgcHVibGljIHNlYXJjaEVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcbiAgY2F0ZWdvcnlfbGlzdDogYW55ID0gW107XHJcbiAgYXBwX2xpc3Q6IGFueSA9IFtdO1xyXG4gIGN1cnJlbnRHZW9Mb2NhdGlvbjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBleHBsb3JlU2VydmljZTogRXhwbG9yZVNlcnZpY2UsXHJcbiAgICAvLyBwcml2YXRlIG1hcHNBUElMb2FkZXI6IE1hcHNBUElMb2FkZXIsXHJcbiAgICAvLyBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldENhdGVnb3J5TGlzdCgpO1xyXG4gICAgdGhpcy5nZXRNb3N0Vmlld0FwcExpc3QoKTtcclxuICAgIC8vIHRoaXMubWFwc0FQSUxvYWRlci5sb2FkKCkudGhlbihcclxuICAgIC8vICAgKCkgPT4ge1xyXG4gICAgLy8gICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSh0aGlzLnNlYXJjaEVsZW1lbnQubmF0aXZlRWxlbWVudCwgeyB0eXBlczogW1wiYWRkcmVzc1wiXSB9KTtcclxuXHJcbiAgICAvLyAgICAgYXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKFwicGxhY2VfY2hhbmdlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBsZXQgcGxhY2U6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xyXG4gICAgLy8gICAgICAgICBpZiAocGxhY2UuZ2VvbWV0cnkgPT09IHVuZGVmaW5lZCB8fCBwbGFjZS5nZW9tZXRyeSA9PT0gbnVsbCkge1xyXG4gICAgLy8gICAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICk7XHJcbiAgfVxyXG5cclxuICBlbmFibGVMb2NhdGlvblNlcnZpY2VzKCk6IHZvaWQge1xyXG4gICAgZ2VvTG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihlbmFibGVkID0+IHtcclxuICAgICAgaWYgKCFlbmFibGVkKSB7XHJcbiAgICAgICAgZ2VvTG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB0aGlzLnNob3dMb2NhdGlvbigpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNob3dMb2NhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNob3dMb2NhdGlvbigpOiB2b2lkIHtcclxuICAgIGdlb0xvY2F0aW9uLndhdGNoTG9jYXRpb24obG9jYXRpb24gPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRHZW9Mb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICBhbGVydChlcnJvcik7XHJcbiAgICB9LCB7XHJcbiAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAzLFxyXG4gICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcclxuICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCAqIDFcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXRlZ29yeUxpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldENhdGVnb3J5TGlzdCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5X2xpc3QgPSByZXM7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIGdldE1vc3RWaWV3QXBwTGlzdCgpIHtcclxuICAgIHRoaXMuZXhwbG9yZVNlcnZpY2UuZ2V0TW9zdFZpZXdBcHBMaXN0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwX2xpc3QgPSByZXM7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIG9uSXRlbVRhcChhcmdzOiBJdGVtRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnSXRlbSB3aXRoIGluZGV4OiAnICsgYXJncy5pbmRleCArICcgdGFwcGVkJyk7XHJcbiAgfVxyXG5cclxuICBhZGRUb0Rhc2hib2FyZChhcmdzKSB7XHJcbiAgICBsZXQgdmFsID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcclxuICAgIGlmICh2YWwuY2hlY2tlZCkge1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBvbkNhdGVnb3J5Q2hhbmdlKGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKGFyZ3Muc2VsZWN0ZWQpXHJcbiAgfVxyXG5cclxuXHJcbn0iXX0=