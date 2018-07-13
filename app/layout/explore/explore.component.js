"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBsb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCwwRUFBd0U7QUFDeEUseUVBQTBEO0FBQzFELGtDQUFlLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSx5Q0FBWSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBRXBELHVFQUFvRTtBQUNwRSw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLGlFQUFpRTtBQVFqRTtJQUlFLDBCQUNVLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUp4Qyx5REFBeUQ7UUFDekQsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFRLEVBQUUsQ0FBQztJQU9uQixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixrQ0FBa0M7UUFDbEMsWUFBWTtRQUNaLHdIQUF3SDtRQUV4SCx3REFBd0Q7UUFDeEQsZ0NBQWdDO1FBQ2hDLCtFQUErRTtRQUMvRSx5RUFBeUU7UUFDekUsb0JBQW9CO1FBQ3BCLFlBQVk7UUFDWixZQUFZO1FBQ1osVUFBVTtRQUNWLE1BQU07UUFDTixLQUFLO0lBQ1AsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUM3QyxVQUFBLEdBQUc7WUFDRCxLQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELDZDQUFrQixHQUFsQjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsQ0FDaEQsVUFBQSxHQUFHO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVUsSUFBbUI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNqQixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRWxCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLENBQUM7SUFDSCxDQUFDO0lBSUQsMkNBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQXhFVSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBTTBCLGdDQUFjO09BTDdCLGdCQUFnQixDQTJFNUI7SUFBRCx1QkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZWxlY3QgfSBmcm9tICduYXRpdmVzY3JpcHQtZmlsdGVyLXNlbGVjdCc7XHJcbnJlZ2lzdGVyRWxlbWVudCgnRmlsdGVyU2VsZWN0JywgKCkgPT4gRmlsdGVyU2VsZWN0KTtcclxuXHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlXCJcclxuLy8gaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJ0BhZ20vY29yZSc7XHJcbi8vIGltcG9ydCB7IH0gZnJvbSAnQHR5cGVzL2dvb2dsZW1hcHMnO1xyXG4vLyBpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZXhwbG9yZVwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9leHBsb3JlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZXhwbG9yZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cGxvcmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8vIEBWaWV3Q2hpbGQoJ3NlYXJjaCcpIHB1YmxpYyBzZWFyY2hFbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIGNhdGVnb3J5X2xpc3Q6IGFueSA9IFtdO1xyXG4gIGFwcF9saXN0OiBhbnkgPSBbXTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwbG9yZVNlcnZpY2U6IEV4cGxvcmVTZXJ2aWNlLFxyXG4gICAgLy8gcHJpdmF0ZSBtYXBzQVBJTG9hZGVyOiBNYXBzQVBJTG9hZGVyLFxyXG4gICAgLy8gcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZXRDYXRlZ29yeUxpc3QoKTtcclxuICAgIHRoaXMuZ2V0TW9zdFZpZXdBcHBMaXN0KCk7XHJcbiAgICAvLyB0aGlzLm1hcHNBUElMb2FkZXIubG9hZCgpLnRoZW4oXHJcbiAgICAvLyAgICgpID0+IHtcclxuICAgIC8vICAgICBsZXQgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUodGhpcy5zZWFyY2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHsgdHlwZXM6IFtcImFkZHJlc3NcIl0gfSk7XHJcblxyXG4gICAgLy8gICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcihcInBsYWNlX2NoYW5nZWRcIiwgKCkgPT4ge1xyXG4gICAgLy8gICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgbGV0IHBsYWNlOiBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcclxuICAgIC8vICAgICAgICAgaWYgKHBsYWNlLmdlb21ldHJ5ID09PSB1bmRlZmluZWQgfHwgcGxhY2UuZ2VvbWV0cnkgPT09IG51bGwpIHtcclxuICAgIC8vICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyApO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2F0ZWdvcnlMaXN0KCkge1xyXG4gICAgdGhpcy5leHBsb3JlU2VydmljZS5nZXRDYXRlZ29yeUxpc3QoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeV9saXN0ID0gcmVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBnZXRNb3N0Vmlld0FwcExpc3QoKSB7XHJcbiAgICB0aGlzLmV4cGxvcmVTZXJ2aWNlLmdldE1vc3RWaWV3QXBwTGlzdCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmFwcF9saXN0ID0gcmVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UYXAoYXJnczogSXRlbUV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ0l0ZW0gd2l0aCBpbmRleDogJyArIGFyZ3MuaW5kZXggKyAnIHRhcHBlZCcpO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9EYXNoYm9hcmQoYXJncykge1xyXG4gICAgbGV0IHZhbCA9IDxTd2l0Y2g+YXJncy5vYmplY3Q7XHJcbiAgICBpZiAodmFsLmNoZWNrZWQpIHtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25DYXRlZ29yeUNoYW5nZShhcmdzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhhcmdzLnNlbGVjdGVkKVxyXG4gIH1cclxuXHJcblxyXG59Il19