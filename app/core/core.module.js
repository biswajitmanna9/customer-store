"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
// guard
var auth_guard_1 = require("./guard/auth.guard");
// services
var login_service_1 = require("./services/login.service");
var explore_service_1 = require("./services/explore.service");
// component
var action_bar_component_1 = require("./component/action-bar/action-bar.component");
var menu_bar_component_1 = require("./component/menu-bar/menu-bar.component");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule_1 = CoreModule;
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule_1,
            providers: [
                auth_guard_1.AuthGuard,
                login_service_1.LoginService,
                explore_service_1.ExploreService
            ]
        };
    };
    CoreModule = CoreModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule
            ],
            declarations: [
                action_bar_component_1.ActionBarComponent,
                menu_bar_component_1.MenuBarComponent
            ],
            exports: [
                action_bar_component_1.ActionBarComponent,
                forms_1.NativeScriptFormsModule,
                menu_bar_component_1.MenuBarComponent
            ],
            entryComponents: [],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CoreModule);
    return CoreModule;
    var CoreModule_1;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUNoRixzREFBdUU7QUFDdkUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFFbkUsUUFBUTtBQUNSLGlEQUErQztBQUUvQyxXQUFXO0FBQ1gsMERBQXdEO0FBQ3hELDhEQUE0RDtBQUU1RCxZQUFZO0FBQ1osb0ZBQWlGO0FBQ2pGLDhFQUEwRTtBQXlCMUU7SUFBQTtJQVdBLENBQUM7bUJBWFksVUFBVTtJQUNaLGtCQUFPLEdBQWQ7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsWUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1Asc0JBQVM7Z0JBQ1QsNEJBQVk7Z0JBQ1osZ0NBQWM7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztJQVZRLFVBQVU7UUF2QnRCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLGlDQUF3QjtnQkFDeEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7YUFDekI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YseUNBQWtCO2dCQUNsQixxQ0FBZ0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wseUNBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLHFDQUFnQjthQUNuQjtZQUNELGVBQWUsRUFBRSxFQUVoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQVd0QjtJQUFELGlCQUFDOztDQUFBLEFBWEQsSUFXQztBQVhZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xyXG5cclxuLy8gZ3VhcmRcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZC9hdXRoLmd1YXJkJztcclxuXHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9naW4uc2VydmljZSc7XHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9leHBsb3JlLnNlcnZpY2UnO1xyXG5cclxuLy8gY29tcG9uZW50XHJcbmltcG9ydCB7IEFjdGlvbkJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZW51QmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbWVudS1iYXIvbWVudS1iYXIuY29tcG9uZW50J1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBY3Rpb25CYXJDb21wb25lbnQsXHJcbiAgICAgICAgTWVudUJhckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBBY3Rpb25CYXJDb21wb25lbnQsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWVudUJhckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG5cclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogQ29yZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBBdXRoR3VhcmQsXHJcbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBFeHBsb3JlU2VydmljZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSJdfQ==