"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var all_app_routing_1 = require("./all-app.routing");
var all_app_component_1 = require("./all-app.component");
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
                all_app_component_1.AllAppComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AllAppModule);
    return AllAppModule;
}());
exports.AllAppModule = AllAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLWFwcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGwtYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUscURBQXdEO0FBQ3hELHlEQUFzRDtBQUV0RCxzREFBb0Q7QUFlcEQ7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUFieEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIscUNBQW1CO2dCQUNuQix3QkFBVTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLG1DQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBBbGxBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hbGwtYXBwLnJvdXRpbmcnO1xyXG5pbXBvcnQgeyBBbGxBcHBDb21wb25lbnQgfSBmcm9tICcuL2FsbC1hcHAuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi4vLi4vY29yZS9jb3JlLm1vZHVsZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQWxsQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQWxsQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFsbEFwcE1vZHVsZSB7IH1cclxuIl19