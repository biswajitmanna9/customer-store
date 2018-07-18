import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { StoreAppComponent } from "./store-app.component";
import { StoreAppProductsComponent } from './products/products.component';
import { StoreAppContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
    { path: "about-us/:id", component: StoreAppComponent },
    { path: "products/:id", component: StoreAppProductsComponent },
    { path: "contact-us/:id", component: StoreAppContactUsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class StoreAppRoutingModule { }
