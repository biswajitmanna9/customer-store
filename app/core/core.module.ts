import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";

// directive
import { MinLengthDirective, IsEmailDirective } from "./directive/input.directive";

// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { LoginService } from './services/login.service';
import { ExploreService } from './services/explore.service';

// component
import { ActionBarComponent } from './component/action-bar/action-bar.component';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component'

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule
    ],
    declarations: [
        MinLengthDirective,
        IsEmailDirective,
        ActionBarComponent,
        MenuBarComponent
    ],
    exports: [
        MinLengthDirective,
        IsEmailDirective,
        ActionBarComponent,
        NativeScriptFormsModule,
        MenuBarComponent
    ],
    entryComponents: [

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthGuard,
                LoginService,
                ExploreService
            ]
        };
    }
}