import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { DropDownModule } from "nativescript-drop-down/angular";
import { AccordionModule } from "nativescript-accordion/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
// directive
import { MinLengthDirective, MaxLengthDirective, IsEmailDirective } from "./directive/input.directive";
import { CarouselDirective } from "./directive/carousel.directive";
// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { LoginService } from './services/login.service';
import { ExploreService } from './services/explore.service';
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { StoreAppService } from './services/store-app.service';
// component
import { ActionBarComponent } from './component/action-bar/action-bar.component';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { SignUpModalComponent } from './component/signup-modal/signup-modal.component';
import { LocationModalComponent } from './component/location-modal/location-modal.component';
import { AppMenuBarComponent } from './component/app-menu-bar/app-menu-bar.component';
import { AppActionBarComponent } from './component/app-action-bar/app-action-bar.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        TNSFontIconModule.forRoot({
            'fa': './css/font-awesome.min.css'
        }),
        DropDownModule,
        AccordionModule,
        TNSCheckBoxModule
    ],
    declarations: [
        MinLengthDirective,
        MaxLengthDirective,
        IsEmailDirective,
        ActionBarComponent,
        MenuBarComponent,
        LoginModalComponent,
        SignUpModalComponent,
        LocationModalComponent,
        AppMenuBarComponent,
        CarouselDirective,
        AppActionBarComponent
    ],
    exports: [
        TNSFontIconModule,
        DropDownModule,
        AccordionModule,
        TNSCheckBoxModule,
        MinLengthDirective,
        MaxLengthDirective,
        IsEmailDirective,
        ActionBarComponent,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        MenuBarComponent,
        AppMenuBarComponent,
        CarouselDirective,
        AppActionBarComponent
    ],
    entryComponents: [
        LoginModalComponent,
        SignUpModalComponent,
        LocationModalComponent
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
                ExploreService,
                ModalDialogService,
                StoreAppService
            ]
        };
    }
}