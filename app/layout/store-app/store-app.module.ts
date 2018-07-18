import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { StoreAppRoutingModule } from './store-app.routing';
import { StoreAppComponent } from './store-app.component';
import { StoreAppProductsComponent } from './products/products.component';
import { StoreAppContactUsComponent } from './contact-us/contact-us.component';

import { CoreModule } from "../../core/core.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        StoreAppRoutingModule,
        CoreModule
    ],
    declarations: [
        StoreAppComponent,
        StoreAppProductsComponent,
        StoreAppContactUsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StoreAppModule { }
