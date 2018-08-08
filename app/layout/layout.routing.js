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
            { path: 'store-app', loadChildren: './layout/store-app/store-app.module#StoreAppModule' },
            { path: 'all-app', loadChildren: './layout/all-app/all-app.module#AllAppModule' }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXlvdXQucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFFdkUsdURBQXFEO0FBRXJELElBQU0sTUFBTSxHQUFXO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsa0NBQWU7UUFDMUIsUUFBUSxFQUFFO1lBQ04sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUU7WUFDbkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxxREFBcUQsRUFBRTtZQUMxRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLCtDQUErQyxFQUFFO1lBQ2xGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsb0RBQW9ELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSw4Q0FBOEMsRUFBRTtTQUNwRjtLQUNKO0NBQ0osQ0FBQztBQU1GO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixtQkFBbUI7UUFKL0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxtQkFBbUIsQ0FBSTtJQUFELDBCQUFDO0NBQUEsQUFBcEMsSUFBb0M7QUFBdkIsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXQuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgIGNvbXBvbmVudDogTGF5b3V0Q29tcG9uZW50LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICdleHBsb3JlJyB9LFxyXG4gICAgICAgICAgICB7IHBhdGg6ICdkYXNoYm9hcmQnLCBsb2FkQ2hpbGRyZW46ICcuL2xheW91dC9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZSNEYXNoYm9hcmRNb2R1bGUnIH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogJ2V4cGxvcmUnLCBsb2FkQ2hpbGRyZW46ICcuL2xheW91dC9leHBsb3JlL2V4cGxvcmUubW9kdWxlI0V4cGxvcmVNb2R1bGUnIH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogJ3N0b3JlLWFwcCcsIGxvYWRDaGlsZHJlbjogJy4vbGF5b3V0L3N0b3JlLWFwcC9zdG9yZS1hcHAubW9kdWxlI1N0b3JlQXBwTW9kdWxlJyB9LFxyXG4gICAgICAgICAgICB7IHBhdGg6ICdhbGwtYXBwJywgbG9hZENoaWxkcmVuOiAnLi9sYXlvdXQvYWxsLWFwcC9hbGwtYXBwLm1vZHVsZSNBbGxBcHBNb2R1bGUnIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXRSb3V0aW5nTW9kdWxlIHsgfSJdfQ==