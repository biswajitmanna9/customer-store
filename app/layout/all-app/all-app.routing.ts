import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AllAppComponent } from "./all-app.component";
import { AppDetailsComponent } from './app-details/app-details.component';

const routes: Routes = [
    { path: "", component: AllAppComponent },
    { path: "details/:id", component: AppDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AllAppRoutingModule { }
