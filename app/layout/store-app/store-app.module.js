"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var store_app_routing_1 = require("./store-app.routing");
var store_app_component_1 = require("./store-app.component");
var products_component_1 = require("./products/products.component");
var contact_us_component_1 = require("./contact-us/contact-us.component");
var about_us_component_1 = require("./about-us/about-us.component");
var cart_component_1 = require("./cart/cart.component");
var payment_component_1 = require("./payment/payment.component");
var messenger_component_1 = require("./messenger/messenger.component");
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
                about_us_component_1.StoreAppAboutUsComponent,
                products_component_1.StoreAppProductsComponent,
                contact_us_component_1.StoreAppContactUsComponent,
                cart_component_1.StoreAppCartComponent,
                payment_component_1.StoreAppPaymentComponent,
                messenger_component_1.StoreAppMessengerComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], StoreAppModule);
    return StoreAppModule;
}());
exports.StoreAppModule = StoreAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JlLWFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLHlEQUE0RDtBQUM1RCw2REFBMEQ7QUFDMUQsb0VBQTBFO0FBQzFFLDBFQUErRTtBQUMvRSxvRUFBeUU7QUFDekUsd0RBQThEO0FBQzlELGlFQUF1RTtBQUN2RSx1RUFBNkU7QUFFN0Usc0RBQW9EO0FBcUJwRDtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQW5CMUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIseUNBQXFCO2dCQUNyQix3QkFBVTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHVDQUFpQjtnQkFDakIsNkNBQXdCO2dCQUN4Qiw4Q0FBeUI7Z0JBQ3pCLGlEQUEwQjtnQkFDMUIsc0NBQXFCO2dCQUNyQiw0Q0FBd0I7Z0JBQ3hCLGdEQUEwQjthQUM3QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtBQUFsQix3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgU3RvcmVBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS1hcHAucm91dGluZyc7XHJcbmltcG9ydCB7IFN0b3JlQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RvcmVBcHBQcm9kdWN0c0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdHMvcHJvZHVjdHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RvcmVBcHBDb250YWN0VXNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhY3QtdXMvY29udGFjdC11cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcEFib3V0VXNDb21wb25lbnQgfSBmcm9tICcuL2Fib3V0LXVzL2Fib3V0LXVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0b3JlQXBwQ2FydENvbXBvbmVudCB9IGZyb20gJy4vY2FydC9jYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0b3JlQXBwUGF5bWVudENvbXBvbmVudCB9IGZyb20gJy4vcGF5bWVudC9wYXltZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0b3JlQXBwTWVzc2VuZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzZW5nZXIvbWVzc2VuZ2VyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29yZS5tb2R1bGVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIFN0b3JlQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgU3RvcmVBcHBDb21wb25lbnQsXHJcbiAgICAgICAgU3RvcmVBcHBBYm91dFVzQ29tcG9uZW50LFxyXG4gICAgICAgIFN0b3JlQXBwUHJvZHVjdHNDb21wb25lbnQsXHJcbiAgICAgICAgU3RvcmVBcHBDb250YWN0VXNDb21wb25lbnQsXHJcbiAgICAgICAgU3RvcmVBcHBDYXJ0Q29tcG9uZW50LFxyXG4gICAgICAgIFN0b3JlQXBwUGF5bWVudENvbXBvbmVudCxcclxuICAgICAgICBTdG9yZUFwcE1lc3NlbmdlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZUFwcE1vZHVsZSB7IH1cclxuIl19