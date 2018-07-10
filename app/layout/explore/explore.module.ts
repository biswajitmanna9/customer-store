import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ExploreRoutingModule } from './explore.routing';
import { ExploreComponent } from './explore.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ExploreRoutingModule,
        CoreModule
    ],
    declarations: [
        ExploreComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ExploreModule { }
