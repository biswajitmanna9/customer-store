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
var angular_3 = require("nativescript-checkbox/angular");
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
nativescript_ngx_fonticon_1.TNSFontIconService.debug = true;
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
                angular_2.AccordionModule,
                angular_3.TNSCheckBoxModule
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
                angular_3.TNSCheckBoxModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRjtBQUNoRixzREFBdUU7QUFDdkUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFDckQsZ0VBQWdGO0FBQ2hGLHVFQUFpRjtBQUNqRiwwREFBZ0U7QUFDaEUsMERBQWlFO0FBQ2pFLHlEQUFrRTtBQUNsRSxZQUFZO0FBQ1osK0RBQXVHO0FBQ3ZHLHFFQUFtRTtBQUNuRSxRQUFRO0FBQ1IsaURBQStDO0FBRS9DLFdBQVc7QUFDWCwwREFBd0Q7QUFDeEQsOERBQTREO0FBQzVELGtFQUF1RTtBQUN2RSxrRUFBK0Q7QUFDL0QsWUFBWTtBQUNaLG9GQUFpRjtBQUNqRiw4RUFBMkU7QUFDM0UsdUZBQW9GO0FBQ3BGLDBGQUF1RjtBQUN2RixnR0FBNkY7QUFDN0YsMEZBQXNGO0FBQ3RGLGdHQUE0RjtBQUM1Riw4Q0FBa0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBcURoQztJQUFBO0lBYUEsQ0FBQzttQkFiWSxVQUFVO0lBQ1osa0JBQU8sR0FBZDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxzQkFBUztnQkFDVCw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCxpQ0FBa0I7Z0JBQ2xCLG1DQUFlO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFaUSxVQUFVO1FBcER0QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4QixpQ0FBd0I7Z0JBQ3hCLCtCQUF1QjtnQkFDdkIsMkJBQW1CO2dCQUNuQiwwQ0FBNEI7Z0JBQzVCLDZDQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDdEIsSUFBSSxFQUFFLDRCQUE0QjtpQkFDckMsQ0FBQztnQkFDRix3QkFBYztnQkFDZCx5QkFBZTtnQkFDZiwyQkFBaUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0NBQWtCO2dCQUNsQixvQ0FBa0I7Z0JBQ2xCLGtDQUFnQjtnQkFDaEIseUNBQWtCO2dCQUNsQixxQ0FBZ0I7Z0JBQ2hCLDJDQUFtQjtnQkFDbkIsNkNBQW9CO2dCQUNwQixpREFBc0I7Z0JBQ3RCLDRDQUFtQjtnQkFDbkIsc0NBQWlCO2dCQUNqQixnREFBcUI7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsNkNBQWlCO2dCQUNqQix3QkFBYztnQkFDZCx5QkFBZTtnQkFDZiwyQkFBaUI7Z0JBQ2pCLG9DQUFrQjtnQkFDbEIsb0NBQWtCO2dCQUNsQixrQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLHFDQUFnQjtnQkFDaEIsNENBQW1CO2dCQUNuQixzQ0FBaUI7Z0JBQ2pCLGdEQUFxQjthQUN4QjtZQUNELGVBQWUsRUFBRTtnQkFDYiwyQ0FBbUI7Z0JBQ25CLDZDQUFvQjtnQkFDcEIsaURBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxVQUFVLENBYXRCO0lBQUQsaUJBQUM7O0NBQUEsQUFiRCxJQWFDO0FBYlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlLFROU0ZvbnRJY29uU2VydmljZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZ3gtZm9udGljb24nO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hY2NvcmRpb24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcclxuLy8gZGlyZWN0aXZlXHJcbmltcG9ydCB7IE1pbkxlbmd0aERpcmVjdGl2ZSwgTWF4TGVuZ3RoRGlyZWN0aXZlLCBJc0VtYWlsRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlL2lucHV0LmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBDYXJvdXNlbERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZS9jYXJvdXNlbC5kaXJlY3RpdmVcIjtcclxuLy8gZ3VhcmRcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZC9hdXRoLmd1YXJkJztcclxuXHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9naW4uc2VydmljZSc7XHJcbmltcG9ydCB7IEV4cGxvcmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9leHBsb3JlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IFN0b3JlQXBwU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RvcmUtYXBwLnNlcnZpY2UnO1xyXG4vLyBjb21wb25lbnRcclxuaW1wb3J0IHsgQWN0aW9uQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvYWN0aW9uLWJhci9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1lbnVCYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9tZW51LWJhci9tZW51LWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lnblVwTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9zaWdudXAtbW9kYWwvc2lnbnVwLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvY2F0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9sb2NhdGlvbi1tb2RhbC9sb2NhdGlvbi1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBNZW51QmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvYXBwLW1lbnUtYmFyL2FwcC1tZW51LWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBBY3Rpb25CYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9hcHAtYWN0aW9uLWJhci9hcHAtYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5UTlNGb250SWNvblNlcnZpY2UuZGVidWcgPSB0cnVlO1xyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIFROU0ZvbnRJY29uTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICAgICAgICAnZmEnOiAnLi9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgRHJvcERvd25Nb2R1bGUsXHJcbiAgICAgICAgQWNjb3JkaW9uTW9kdWxlLFxyXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgTWluTGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIE1heExlbmd0aERpcmVjdGl2ZSxcclxuICAgICAgICBJc0VtYWlsRGlyZWN0aXZlLFxyXG4gICAgICAgIEFjdGlvbkJhckNvbXBvbmVudCxcclxuICAgICAgICBNZW51QmFyQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgU2lnblVwTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgTG9jYXRpb25Nb2RhbENvbXBvbmVudCxcclxuICAgICAgICBBcHBNZW51QmFyQ29tcG9uZW50LFxyXG4gICAgICAgIENhcm91c2VsRGlyZWN0aXZlLFxyXG4gICAgICAgIEFwcEFjdGlvbkJhckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBUTlNGb250SWNvbk1vZHVsZSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZSxcclxuICAgICAgICBBY2NvcmRpb25Nb2R1bGUsXHJcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXHJcbiAgICAgICAgTWluTGVuZ3RoRGlyZWN0aXZlLFxyXG4gICAgICAgIE1heExlbmd0aERpcmVjdGl2ZSxcclxuICAgICAgICBJc0VtYWlsRGlyZWN0aXZlLFxyXG4gICAgICAgIEFjdGlvbkJhckNvbXBvbmVudCxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1lbnVCYXJDb21wb25lbnQsXHJcbiAgICAgICAgQXBwTWVudUJhckNvbXBvbmVudCxcclxuICAgICAgICBDYXJvdXNlbERpcmVjdGl2ZSxcclxuICAgICAgICBBcHBBY3Rpb25CYXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIFNpZ25VcE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIExvY2F0aW9uTW9kYWxDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogQ29yZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBBdXRoR3VhcmQsXHJcbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBFeHBsb3JlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICAgICAgICAgIFN0b3JlQXBwU2VydmljZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSJdfQ==