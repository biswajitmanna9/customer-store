"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var all_app_routing_1 = require("./all-app.routing");
var all_app_component_1 = require("./all-app.component");
var app_details_component_1 = require("./app-details/app-details.component");
var core_module_1 = require("../../core/core.module");
var AllAppModule = /** @class */ (function () {
    function AllAppModule() {
    }
    AllAppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                all_app_routing_1.AllAppRoutingModule,
                core_module_1.CoreModule
            ],
            declarations: [
                all_app_component_1.AllAppComponent,
                app_details_component_1.AppDetailsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AllAppModule);
    return AllAppModule;
}());
exports.AllAppModule = AllAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLWFwcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGwtYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUscURBQXdEO0FBQ3hELHlEQUFzRDtBQUN0RCw2RUFBMEU7QUFFMUUsc0RBQW9EO0FBZ0JwRDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQWR4QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QixxQ0FBbUI7Z0JBQ25CLHdCQUFVO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsbUNBQWU7Z0JBQ2YsMkNBQW1CO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBBbGxBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hbGwtYXBwLnJvdXRpbmcnO1xyXG5pbXBvcnQgeyBBbGxBcHBDb21wb25lbnQgfSBmcm9tICcuL2FsbC1hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vYXBwLWRldGFpbHMvYXBwLWRldGFpbHMuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi4vLi4vY29yZS9jb3JlLm1vZHVsZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQWxsQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQWxsQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIEFwcERldGFpbHNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxsQXBwTW9kdWxlIHsgfVxyXG4iXX0=