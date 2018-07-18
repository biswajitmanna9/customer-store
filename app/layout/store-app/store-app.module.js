"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var store_app_routing_1 = require("./store-app.routing");
var store_app_component_1 = require("./store-app.component");
var products_component_1 = require("./products/products.component");
var contact_us_component_1 = require("./contact-us/contact-us.component");
var core_module_1 = require("../../core/core.module");
var StoreAppModule = /** @class */ (function () {
    function StoreAppModule() {
    }
    StoreAppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                store_app_routing_1.StoreAppRoutingModule,
                core_module_1.CoreModule
            ],
            declarations: [
                store_app_component_1.StoreAppComponent,
                products_component_1.StoreAppProductsComponent,
                contact_us_component_1.StoreAppContactUsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], StoreAppModule);
    return StoreAppModule;
}());
exports.StoreAppModule = StoreAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JlLWFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLHlEQUE0RDtBQUM1RCw2REFBMEQ7QUFDMUQsb0VBQTBFO0FBQzFFLDBFQUErRTtBQUUvRSxzREFBb0Q7QUFpQnBEO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBZjFCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHlDQUFxQjtnQkFDckIsd0JBQVU7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVix1Q0FBaUI7Z0JBQ2pCLDhDQUF5QjtnQkFDekIsaURBQTBCO2FBQzdCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxjQUFjLENBQUk7SUFBRCxxQkFBQztDQUFBLEFBQS9CLElBQStCO0FBQWxCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBTdG9yZUFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL3N0b3JlLWFwcC5yb3V0aW5nJztcclxuaW1wb3J0IHsgU3RvcmVBcHBDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWFwcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFByb2R1Y3RzQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0cy9wcm9kdWN0cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcENvbnRhY3RVc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFjdC11cy9jb250YWN0LXVzLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29yZS5tb2R1bGVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIFN0b3JlQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgU3RvcmVBcHBDb21wb25lbnQsXHJcbiAgICAgICAgU3RvcmVBcHBQcm9kdWN0c0NvbXBvbmVudCxcclxuICAgICAgICBTdG9yZUFwcENvbnRhY3RVc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcE1vZHVsZSB7IH1cclxuIl19