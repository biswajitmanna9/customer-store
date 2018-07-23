"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var store_app_component_1 = require("./store-app.component");
var products_component_1 = require("./products/products.component");
var contact_us_component_1 = require("./contact-us/contact-us.component");
var about_us_component_1 = require("./about-us/about-us.component");
var cart_component_1 = require("./cart/cart.component");
var payment_component_1 = require("./payment/payment.component");
var messenger_component_1 = require("./messenger/messenger.component");
var routes = [
    {
        path: ':id',
        component: store_app_component_1.StoreAppComponent,
        children: [
            { path: "about-us", component: about_us_component_1.StoreAppAboutUsComponent },
            { path: "products", component: products_component_1.StoreAppProductsComponent },
            { path: "contact-us", component: contact_us_component_1.StoreAppContactUsComponent },
            { path: "cart", component: cart_component_1.StoreAppCartComponent },
            { path: "payment", component: payment_component_1.StoreAppPaymentComponent },
            { path: "messenger", component: messenger_component_1.StoreAppMessengerComponent }
        ]
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS1hcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUV6QyxzREFBdUU7QUFFdkUsNkRBQTBEO0FBQzFELG9FQUEwRTtBQUMxRSwwRUFBK0U7QUFDL0Usb0VBQXlFO0FBQ3pFLHdEQUE4RDtBQUM5RCxpRUFBdUU7QUFDdkUsdUVBQTZFO0FBRTdFLElBQU0sTUFBTSxHQUFXO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsdUNBQWlCO1FBQzVCLFFBQVEsRUFBRTtZQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsNkNBQXdCLEVBQUU7WUFDekQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSw4Q0FBeUIsRUFBRTtZQUMxRCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGlEQUEwQixFQUFFO1lBQzdELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsc0NBQXFCLEVBQUU7WUFDbEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSw0Q0FBd0IsRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdEQUEwQixFQUFFO1NBQy9EO0tBQ0o7Q0FFSixDQUFDO0FBTUY7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQUpqQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLHFCQUFxQixDQUFJO0lBQUQsNEJBQUM7Q0FBQSxBQUF0QyxJQUFzQztBQUF6QixzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgU3RvcmVBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9zdG9yZS1hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwUHJvZHVjdHNDb21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3RzL3Byb2R1Y3RzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0b3JlQXBwQ29udGFjdFVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWN0LXVzL2NvbnRhY3QtdXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RvcmVBcHBBYm91dFVzQ29tcG9uZW50IH0gZnJvbSAnLi9hYm91dC11cy9hYm91dC11cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcENhcnRDb21wb25lbnQgfSBmcm9tICcuL2NhcnQvY2FydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFBheW1lbnRDb21wb25lbnQgfSBmcm9tICcuL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdG9yZUFwcE1lc3NlbmdlckNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2VuZ2VyL21lc3Nlbmdlci5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJzppZCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdG9yZUFwcENvbXBvbmVudCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7IHBhdGg6IFwiYWJvdXQtdXNcIiwgY29tcG9uZW50OiBTdG9yZUFwcEFib3V0VXNDb21wb25lbnQgfSxcclxuICAgICAgICAgICAgeyBwYXRoOiBcInByb2R1Y3RzXCIsIGNvbXBvbmVudDogU3RvcmVBcHBQcm9kdWN0c0NvbXBvbmVudCB9LFxyXG4gICAgICAgICAgICB7IHBhdGg6IFwiY29udGFjdC11c1wiLCBjb21wb25lbnQ6IFN0b3JlQXBwQ29udGFjdFVzQ29tcG9uZW50IH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogXCJjYXJ0XCIsIGNvbXBvbmVudDogU3RvcmVBcHBDYXJ0Q29tcG9uZW50IH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogXCJwYXltZW50XCIsIGNvbXBvbmVudDogU3RvcmVBcHBQYXltZW50Q29tcG9uZW50IH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogXCJtZXNzZW5nZXJcIiwgY29tcG9uZW50OiBTdG9yZUFwcE1lc3NlbmdlckNvbXBvbmVudCB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlQXBwUm91dGluZ01vZHVsZSB7IH1cclxuIl19