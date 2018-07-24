"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var forms_2 = require("@angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var nativescript_ngx_fonticon_1 = require("nativescript-ngx-fonticon");
var angular_1 = require("nativescript-drop-down/angular");
var angular_2 = require("nativescript-accordion/angular");
// directive
var input_directive_1 = require("./directive/input.directive");
var carousel_directive_1 = require("./directive/carousel.directive");
// guard
var auth_guard_1 = require("./guard/auth.guard");
// services
var login_service_1 = require("./services/login.service");
var explore_service_1 = require("./services/explore.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var store_app_service_1 = require("./services/store-app.service");
// component
var action_bar_component_1 = require("./component/action-bar/action-bar.component");
var menu_bar_component_1 = require("./component/menu-bar/menu-bar.component");
var login_modal_component_1 = require("./component/login-modal/login-modal.component");
var signup_modal_component_1 = require("./component/signup-modal/signup-modal.component");
var location_modal_component_1 = require("./component/location-modal/location-modal.component");
var app_menu_bar_component_1 = require("./component/app-menu-bar/app-menu-bar.component");
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
                explore_service_1.ExploreService,
                modal_dialog_1.ModalDialogService,
                store_app_service_1.StoreAppService
            ]
        };
    };
    CoreModule = CoreModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                forms_2.ReactiveFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                nativescript_ngx_fonticon_1.TNSFontIconModule.forRoot({
                    'fa': './css/font-awesome.min.css'
                }),
                angular_1.DropDownModule,
                angular_2.AccordionModule
            ],
            declarations: [
                input_directive_1.MinLengthDirective,
                input_directive_1.MaxLengthDirective,
                input_directive_1.IsEmailDirective,
                action_bar_component_1.ActionBarComponent,
                menu_bar_component_1.MenuBarComponent,
                login_modal_component_1.LoginModalComponent,
                signup_modal_component_1.SignUpModalComponent,
                location_modal_component_1.LocationModalComponent,
                app_menu_bar_component_1.AppMenuBarComponent,
                carousel_directive_1.CarouselDirective
            ],
            exports: [
                nativescript_ngx_fonticon_1.TNSFontIconModule,
                angular_1.DropDownModule,
                angular_2.AccordionModule,
                input_directive_1.MinLengthDirective,
                input_directive_1.MaxLengthDirective,
                input_directive_1.IsEmailDirective,
                action_bar_component_1.ActionBarComponent,
                forms_1.NativeScriptFormsModule,
                forms_2.ReactiveFormsModule,
                menu_bar_component_1.MenuBarComponent,
                app_menu_bar_component_1.AppMenuBarComponent,
                carousel_directive_1.CarouselDirective
            ],
            entryComponents: [
                login_modal_component_1.LoginModalComponent,
                signup_modal_component_1.SignUpModalComponent,
                location_modal_component_1.LocationModalComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CoreModule);
    return CoreModule;
    var CoreModule_1;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUNoRixzREFBdUU7QUFDdkUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFDckQsZ0VBQWdGO0FBQ2hGLHVFQUE4RDtBQUM5RCwwREFBZ0U7QUFDaEUsMERBQWlFO0FBQ2pFLFlBQVk7QUFDWiwrREFBdUc7QUFDdkcscUVBQW1FO0FBQ25FLFFBQVE7QUFDUixpREFBK0M7QUFFL0MsV0FBVztBQUNYLDBEQUF3RDtBQUN4RCw4REFBNEQ7QUFDNUQsa0VBQXVFO0FBQ3ZFLGtFQUErRDtBQUMvRCxZQUFZO0FBQ1osb0ZBQWlGO0FBQ2pGLDhFQUEyRTtBQUMzRSx1RkFBb0Y7QUFDcEYsMEZBQXVGO0FBQ3ZGLGdHQUE2RjtBQUM3RiwwRkFBc0Y7QUFpRHRGO0lBQUE7SUFhQSxDQUFDO21CQWJZLFVBQVU7SUFDWixrQkFBTyxHQUFkO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLFlBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNQLHNCQUFTO2dCQUNULDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLGlDQUFrQjtnQkFDbEIsbUNBQWU7YUFDbEI7U0FDSixDQUFDO0lBQ04sQ0FBQztJQVpRLFVBQVU7UUFoRHRCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLGlDQUF3QjtnQkFDeEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLDBDQUE0QjtnQkFDNUIsNkNBQWlCLENBQUMsT0FBTyxDQUFDO29CQUN0QixJQUFJLEVBQUUsNEJBQTRCO2lCQUNyQyxDQUFDO2dCQUNGLHdCQUFjO2dCQUNkLHlCQUFlO2FBQ2xCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLG9DQUFrQjtnQkFDbEIsb0NBQWtCO2dCQUNsQixrQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIscUNBQWdCO2dCQUNoQiwyQ0FBbUI7Z0JBQ25CLDZDQUFvQjtnQkFDcEIsaURBQXNCO2dCQUN0Qiw0Q0FBbUI7Z0JBQ25CLHNDQUFpQjthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCw2Q0FBaUI7Z0JBQ2pCLHdCQUFjO2dCQUNkLHlCQUFlO2dCQUNmLG9DQUFrQjtnQkFDbEIsb0NBQWtCO2dCQUNsQixrQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLHFDQUFnQjtnQkFDaEIsNENBQW1CO2dCQUNuQixzQ0FBaUI7YUFDcEI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsMkNBQW1CO2dCQUNuQiw2Q0FBb0I7Z0JBQ3BCLGlEQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQWF0QjtJQUFELGlCQUFDOztDQUFBLEFBYkQsSUFhQztBQWJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBUTlNGb250SWNvbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZ3gtZm9udGljb24nO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hY2NvcmRpb24vYW5ndWxhclwiO1xyXG4vLyBkaXJlY3RpdmVcclxuaW1wb3J0IHsgTWluTGVuZ3RoRGlyZWN0aXZlLCBNYXhMZW5ndGhEaXJlY3RpdmUsIElzRW1haWxEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmUvaW5wdXQuZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IENhcm91c2VsRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlL2Nhcm91c2VsLmRpcmVjdGl2ZVwiO1xyXG4vLyBndWFyZFxyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkL2F1dGguZ3VhcmQnO1xyXG5cclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2dpbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXhwbG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V4cGxvcmUuc2VydmljZSc7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgU3RvcmVBcHBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yZS1hcHAuc2VydmljZSc7XHJcbi8vIGNvbXBvbmVudFxyXG5pbXBvcnQgeyBBY3Rpb25CYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9hY3Rpb24tYmFyL2FjdGlvbi1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWVudUJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L21lbnUtYmFyL21lbnUtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduVXBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L3NpZ251cC1tb2RhbC9zaWdudXAtbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9jYXRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2xvY2F0aW9uLW1vZGFsL2xvY2F0aW9uLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcE1lbnVCYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9hcHAtbWVudS1iYXIvYXBwLW1lbnUtYmFyLmNvbXBvbmVudCc7XHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICAgICdmYSc6ICcuL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcydcclxuICAgICAgICB9KSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZSxcclxuICAgICAgICBBY2NvcmRpb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBNaW5MZW5ndGhEaXJlY3RpdmUsXHJcbiAgICAgICAgTWF4TGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIElzRW1haWxEaXJlY3RpdmUsXHJcbiAgICAgICAgQWN0aW9uQmFyQ29tcG9uZW50LFxyXG4gICAgICAgIE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Nb2RhbENvbXBvbmVudCxcclxuICAgICAgICBTaWduVXBNb2RhbENvbXBvbmVudCxcclxuICAgICAgICBMb2NhdGlvbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEFwcE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgQ2Fyb3VzZWxEaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25Nb2R1bGUsXHJcbiAgICAgICAgQWNjb3JkaW9uTW9kdWxlLFxyXG4gICAgICAgIE1pbkxlbmd0aERpcmVjdGl2ZSxcclxuICAgICAgICBNYXhMZW5ndGhEaXJlY3RpdmUsXHJcbiAgICAgICAgSXNFbWFpbERpcmVjdGl2ZSxcclxuICAgICAgICBBY3Rpb25CYXJDb21wb25lbnQsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBNZW51QmFyQ29tcG9uZW50LFxyXG4gICAgICAgIEFwcE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgQ2Fyb3VzZWxEaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIFNpZ25VcE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIExvY2F0aW9uTW9kYWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogQ29yZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBBdXRoR3VhcmQsXHJcbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBFeHBsb3JlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICAgICAgICAgIFN0b3JlQXBwU2VydmljZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSJdfQ==