"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var store_app_component_1 = require("./store-app.component");
var products_component_1 = require("./products/products.component");
var contact_us_component_1 = require("./contact-us/contact-us.component");
var routes = [
    { path: "about-us/:id", component: store_app_component_1.StoreAppComponent },
    { path: "products/:id", component: products_component_1.StoreAppProductsComponent },
    { path: "contact-us/:id", component: contact_us_component_1.StoreAppContactUsComponent },
];
var StoreAppRoutingModule = /** @class */ (function () {
    function StoreAppRoutingModule() {
    }
    StoreAppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], StoreAppRoutingModule);
    return StoreAppRoutingModule;
}());
exports.StoreAppRoutingModule = StoreAppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUV6QyxzREFBdUU7QUFFdkUsNkRBQTBEO0FBQzFELG9FQUEwRTtBQUMxRSwwRUFBK0U7QUFFL0UsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLDhDQUF5QixFQUFFO0lBQzlELEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxpREFBMEIsRUFBRTtDQUNwRSxDQUFDO0FBTUY7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQUpqQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLHFCQUFxQixDQUFJO0lBQUQsNEJBQUM7Q0FBQSxBQUF0QyxJQUFzQztBQUF6QixzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgU3RvcmVBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9zdG9yZS1hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwUHJvZHVjdHNDb21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3RzL3Byb2R1Y3RzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0b3JlQXBwQ29udGFjdFVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWN0LXVzL2NvbnRhY3QtdXMuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiBcImFib3V0LXVzLzppZFwiLCBjb21wb25lbnQ6IFN0b3JlQXBwQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwicHJvZHVjdHMvOmlkXCIsIGNvbXBvbmVudDogU3RvcmVBcHBQcm9kdWN0c0NvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiBcImNvbnRhY3QtdXMvOmlkXCIsIGNvbXBvbmVudDogU3RvcmVBcHBDb250YWN0VXNDb21wb25lbnQgfSxcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwUm91dGluZ01vZHVsZSB7IH1cclxuIl19