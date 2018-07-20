import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { StoreAppComponent } from "./store-app.component";
import { StoreAppProductsComponent } from './products/products.component';
import { StoreAppContactUsComponent } from './contact-us/contact-us.component';
import { StoreAppAboutUsComponent } from './about-us/about-us.component';
import { StoreAppCartComponent } from './cart/cart.component';

const routes: Routes = [
    {
        path: ':id',
        component: StoreAppComponent,
        children: [
            { path: "about-us", component: StoreAppAboutUsComponent },
            { path: "products", component: StoreAppProductsComponent },
            { path: "contact-us", component: StoreAppContactUsComponent },
            { path: "cart", component: StoreAppCartComponent }
        ]
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class StoreAppRoutingModule { }
