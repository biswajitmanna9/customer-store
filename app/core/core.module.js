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
var app_action_bar_component_1 = require("./component/app-action-bar/app-action-bar.component");
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
                carousel_directive_1.CarouselDirective,
                app_action_bar_component_1.AppActionBarComponent
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
                carousel_directive_1.CarouselDirective,
                app_action_bar_component_1.AppActionBarComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUNoRixzREFBdUU7QUFDdkUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFDckQsZ0VBQWdGO0FBQ2hGLHVFQUE4RDtBQUM5RCwwREFBZ0U7QUFDaEUsMERBQWlFO0FBQ2pFLFlBQVk7QUFDWiwrREFBdUc7QUFDdkcscUVBQW1FO0FBQ25FLFFBQVE7QUFDUixpREFBK0M7QUFFL0MsV0FBVztBQUNYLDBEQUF3RDtBQUN4RCw4REFBNEQ7QUFDNUQsa0VBQXVFO0FBQ3ZFLGtFQUErRDtBQUMvRCxZQUFZO0FBQ1osb0ZBQWlGO0FBQ2pGLDhFQUEyRTtBQUMzRSx1RkFBb0Y7QUFDcEYsMEZBQXVGO0FBQ3ZGLGdHQUE2RjtBQUM3RiwwRkFBc0Y7QUFDdEYsZ0dBQTRGO0FBb0Q1RjtJQUFBO0lBYUEsQ0FBQzttQkFiWSxVQUFVO0lBQ1osa0JBQU8sR0FBZDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxzQkFBUztnQkFDVCw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCxpQ0FBa0I7Z0JBQ2xCLG1DQUFlO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFaUSxVQUFVO1FBbER0QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QixpQ0FBd0I7Z0JBQ3hCLCtCQUF1QjtnQkFDdkIsMkJBQW1CO2dCQUNuQiwwQ0FBNEI7Z0JBQzVCLDZDQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDdEIsSUFBSSxFQUFFLDRCQUE0QjtpQkFDckMsQ0FBQztnQkFDRix3QkFBYztnQkFDZCx5QkFBZTthQUNsQjtZQUNELFlBQVksRUFBRTtnQkFDVixvQ0FBa0I7Z0JBQ2xCLG9DQUFrQjtnQkFDbEIsa0NBQWdCO2dCQUNoQix5Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsMkNBQW1CO2dCQUNuQiw2Q0FBb0I7Z0JBQ3BCLGlEQUFzQjtnQkFDdEIsNENBQW1CO2dCQUNuQixzQ0FBaUI7Z0JBQ2pCLGdEQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCw2Q0FBaUI7Z0JBQ2pCLHdCQUFjO2dCQUNkLHlCQUFlO2dCQUNmLG9DQUFrQjtnQkFDbEIsb0NBQWtCO2dCQUNsQixrQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLHFDQUFnQjtnQkFDaEIsNENBQW1CO2dCQUNuQixzQ0FBaUI7Z0JBQ2pCLGdEQUFxQjthQUN4QjtZQUNELGVBQWUsRUFBRTtnQkFDYiwyQ0FBbUI7Z0JBQ25CLDZDQUFvQjtnQkFDcEIsaURBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxVQUFVLENBYXRCO0lBQUQsaUJBQUM7O0NBQUEsQUFiRCxJQWFDO0FBYlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5neC1mb250aWNvbic7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBBY2NvcmRpb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFjY29yZGlvbi9hbmd1bGFyXCI7XHJcbi8vIGRpcmVjdGl2ZVxyXG5pbXBvcnQgeyBNaW5MZW5ndGhEaXJlY3RpdmUsIE1heExlbmd0aERpcmVjdGl2ZSwgSXNFbWFpbERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZS9pbnB1dC5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgQ2Fyb3VzZWxEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmUvY2Fyb3VzZWwuZGlyZWN0aXZlXCI7XHJcbi8vIGd1YXJkXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmQvYXV0aC5ndWFyZCc7XHJcblxyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2xvZ2luLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHBsb3JlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXhwbG9yZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBTdG9yZUFwcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JlLWFwcC5zZXJ2aWNlJztcclxuLy8gY29tcG9uZW50XHJcbmltcG9ydCB7IEFjdGlvbkJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZW51QmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbWVudS1iYXIvbWVudS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZ25VcE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvc2lnbnVwLW1vZGFsL3NpZ251cC1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbG9jYXRpb24tbW9kYWwvbG9jYXRpb24tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwTWVudUJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2FwcC1tZW51LWJhci9hcHAtbWVudS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwQWN0aW9uQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvYXBwLWFjdGlvbi1iYXIvYXBwLWFjdGlvbi1iYXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICAgICdmYSc6ICcuL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcydcclxuICAgICAgICB9KSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZSxcclxuICAgICAgICBBY2NvcmRpb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBNaW5MZW5ndGhEaXJlY3RpdmUsXHJcbiAgICAgICAgTWF4TGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIElzRW1haWxEaXJlY3RpdmUsXHJcbiAgICAgICAgQWN0aW9uQmFyQ29tcG9uZW50LFxyXG4gICAgICAgIE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Nb2RhbENvbXBvbmVudCxcclxuICAgICAgICBTaWduVXBNb2RhbENvbXBvbmVudCxcclxuICAgICAgICBMb2NhdGlvbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEFwcE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgQ2Fyb3VzZWxEaXJlY3RpdmUsXHJcbiAgICAgICAgQXBwQWN0aW9uQmFyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFROU0ZvbnRJY29uTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTW9kdWxlLFxyXG4gICAgICAgIEFjY29yZGlvbk1vZHVsZSxcclxuICAgICAgICBNaW5MZW5ndGhEaXJlY3RpdmUsXHJcbiAgICAgICAgTWF4TGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIElzRW1haWxEaXJlY3RpdmUsXHJcbiAgICAgICAgQWN0aW9uQmFyQ29tcG9uZW50LFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWVudUJhckNvbXBvbmVudCxcclxuICAgICAgICBBcHBNZW51QmFyQ29tcG9uZW50LFxyXG4gICAgICAgIENhcm91c2VsRGlyZWN0aXZlLFxyXG4gICAgICAgIEFwcEFjdGlvbkJhckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIExvZ2luTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgU2lnblVwTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgTG9jYXRpb25Nb2RhbENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBDb3JlTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIEF1dGhHdWFyZCxcclxuICAgICAgICAgICAgICAgIExvZ2luU2VydmljZSxcclxuICAgICAgICAgICAgICAgIEV4cGxvcmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgU3RvcmVBcHBTZXJ2aWNlXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59Il19