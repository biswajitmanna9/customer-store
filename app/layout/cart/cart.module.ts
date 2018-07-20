import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CartRoutingModule } from './cart.routing';
import { CartComponent } from './cart.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CartRoutingModule,
        CoreModule
    ],
    declarations: [
        CartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CartModule { }
