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
// directive
var input_directive_1 = require("./directive/input.directive");
// guard
var auth_guard_1 = require("./guard/auth.guard");
// services
var login_service_1 = require("./services/login.service");
var explore_service_1 = require("./services/explore.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
// component
var action_bar_component_1 = require("./component/action-bar/action-bar.component");
var menu_bar_component_1 = require("./component/menu-bar/menu-bar.component");
var login_modal_component_1 = require("./component/login-modal/login-modal.component");
var signup_modal_component_1 = require("./component/signup-modal/signup-modal.component");
var location_modal_component_1 = require("./component/location-modal/location-modal.component");
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
                modal_dialog_1.ModalDialogService
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
                angular_1.DropDownModule
            ],
            declarations: [
                input_directive_1.MinLengthDirective,
                input_directive_1.MaxLengthDirective,
                input_directive_1.IsEmailDirective,
                action_bar_component_1.ActionBarComponent,
                menu_bar_component_1.MenuBarComponent,
                login_modal_component_1.LoginModalComponent,
                signup_modal_component_1.SignUpModalComponent,
                location_modal_component_1.LocationModalComponent
            ],
            exports: [
                nativescript_ngx_fonticon_1.TNSFontIconModule,
                angular_1.DropDownModule,
                input_directive_1.MinLengthDirective,
                input_directive_1.MaxLengthDirective,
                input_directive_1.IsEmailDirective,
                action_bar_component_1.ActionBarComponent,
                forms_1.NativeScriptFormsModule,
                forms_2.ReactiveFormsModule,
                menu_bar_component_1.MenuBarComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUNoRixzREFBdUU7QUFDdkUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFDckQsZ0VBQWdGO0FBQ2hGLHVFQUE4RDtBQUM5RCwwREFBZ0U7QUFDaEUsWUFBWTtBQUNaLCtEQUF1RztBQUV2RyxRQUFRO0FBQ1IsaURBQStDO0FBRS9DLFdBQVc7QUFDWCwwREFBd0Q7QUFDeEQsOERBQTREO0FBQzVELGtFQUF1RTtBQUN2RSxZQUFZO0FBQ1osb0ZBQWlGO0FBQ2pGLDhFQUEyRTtBQUMzRSx1RkFBb0Y7QUFDcEYsMEZBQXVGO0FBQ3ZGLGdHQUE2RjtBQTRDN0Y7SUFBQTtJQVlBLENBQUM7bUJBWlksVUFBVTtJQUNaLGtCQUFPLEdBQWQ7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsWUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1Asc0JBQVM7Z0JBQ1QsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsaUNBQWtCO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFYUSxVQUFVO1FBMUN0QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QixpQ0FBd0I7Z0JBQ3hCLCtCQUF1QjtnQkFDdkIsMkJBQW1CO2dCQUNuQiwwQ0FBNEI7Z0JBQzVCLDZDQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDdEIsSUFBSSxFQUFFLDRCQUE0QjtpQkFDckMsQ0FBQztnQkFDRix3QkFBYzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixvQ0FBa0I7Z0JBQ2xCLG9DQUFrQjtnQkFDbEIsa0NBQWdCO2dCQUNoQix5Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsMkNBQW1CO2dCQUNuQiw2Q0FBb0I7Z0JBQ3BCLGlEQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCw2Q0FBaUI7Z0JBQ2pCLHdCQUFjO2dCQUNkLG9DQUFrQjtnQkFDbEIsb0NBQWtCO2dCQUNsQixrQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLHFDQUFnQjthQUNuQjtZQUNELGVBQWUsRUFBRTtnQkFDYiwyQ0FBbUI7Z0JBQ25CLDZDQUFvQjtnQkFDcEIsaURBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxVQUFVLENBWXRCO0lBQUQsaUJBQUM7O0NBQUEsQUFaRCxJQVlDO0FBWlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5neC1mb250aWNvbic7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG4vLyBkaXJlY3RpdmVcclxuaW1wb3J0IHsgTWluTGVuZ3RoRGlyZWN0aXZlLCBNYXhMZW5ndGhEaXJlY3RpdmUsIElzRW1haWxEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmUvaW5wdXQuZGlyZWN0aXZlXCI7XHJcblxyXG4vLyBndWFyZFxyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkL2F1dGguZ3VhcmQnO1xyXG5cclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2dpbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXhwbG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V4cGxvcmUuc2VydmljZSc7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuLy8gY29tcG9uZW50XHJcbmltcG9ydCB7IEFjdGlvbkJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZW51QmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbWVudS1iYXIvbWVudS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpZ25VcE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvc2lnbnVwLW1vZGFsL3NpZ251cC1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbG9jYXRpb24tbW9kYWwvbG9jYXRpb24tbW9kYWwuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICAgICdmYSc6ICcuL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcydcclxuICAgICAgICB9KSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE1pbkxlbmd0aERpcmVjdGl2ZSxcclxuICAgICAgICBNYXhMZW5ndGhEaXJlY3RpdmUsXHJcbiAgICAgICAgSXNFbWFpbERpcmVjdGl2ZSxcclxuICAgICAgICBBY3Rpb25CYXJDb21wb25lbnQsXHJcbiAgICAgICAgTWVudUJhckNvbXBvbmVudCxcclxuICAgICAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIFNpZ25VcE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIExvY2F0aW9uTW9kYWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25Nb2R1bGUsXHJcbiAgICAgICAgTWluTGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIE1heExlbmd0aERpcmVjdGl2ZSxcclxuICAgICAgICBJc0VtYWlsRGlyZWN0aXZlLFxyXG4gICAgICAgIEFjdGlvbkJhckNvbXBvbmVudCxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1lbnVCYXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIFNpZ25VcE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIExvY2F0aW9uTW9kYWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogQ29yZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBBdXRoR3VhcmQsXHJcbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBFeHBsb3JlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE1vZGFsRGlhbG9nU2VydmljZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSJdfQ==