"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var layout_component_1 = require("./layout.component");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'explore' },
            { path: 'dashboard', loadChildren: './layout/dashboard/dashboard.module#DashboardModule' },
            { path: 'explore', loadChildren: './layout/explore/explore.module#ExploreModule' },
            { path: 'store-app', loadChildren: './layout/store-app/store-app.module#StoreAppModule' }
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXlvdXQucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFFdkUsdURBQXFEO0FBRXJELElBQU0sTUFBTSxHQUFXO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsa0NBQWU7UUFDMUIsUUFBUSxFQUFFO1lBQ04sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDbkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxxREFBcUQsRUFBRTtZQUMxRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLCtDQUErQyxFQUFFO1lBQ2xGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsb0RBQW9ELEVBQUU7U0FDNUY7S0FDSjtDQUNKLENBQUM7QUFNRjtJQUFBO0lBQW1DLENBQUM7SUFBdkIsbUJBQW1CO1FBSi9CLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csbUJBQW1CLENBQUk7SUFBRCwwQkFBQztDQUFBLEFBQXBDLElBQW9DO0FBQXZCLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExheW91dENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0LmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnJyxcclxuICAgICAgICBjb21wb25lbnQ6IExheW91dENvbXBvbmVudCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnZXhwbG9yZScgfSxcclxuICAgICAgICAgICAgeyBwYXRoOiAnZGFzaGJvYXJkJywgbG9hZENoaWxkcmVuOiAnLi9sYXlvdXQvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUjRGFzaGJvYXJkTW9kdWxlJyB9LFxyXG4gICAgICAgICAgICB7IHBhdGg6ICdleHBsb3JlJywgbG9hZENoaWxkcmVuOiAnLi9sYXlvdXQvZXhwbG9yZS9leHBsb3JlLm1vZHVsZSNFeHBsb3JlTW9kdWxlJyB9LFxyXG4gICAgICAgICAgICB7IHBhdGg6ICdzdG9yZS1hcHAnLCBsb2FkQ2hpbGRyZW46ICcuL2xheW91dC9zdG9yZS1hcHAvc3RvcmUtYXBwLm1vZHVsZSNTdG9yZUFwcE1vZHVsZScgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIExheW91dFJvdXRpbmdNb2R1bGUgeyB9Il19