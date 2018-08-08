import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AllAppRoutingModule } from './all-app.routing';
import { AllAppComponent } from './all-app.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AllAppRoutingModule,
        CoreModule
    ],
    declarations: [
        AllAppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AllAppModule { }
