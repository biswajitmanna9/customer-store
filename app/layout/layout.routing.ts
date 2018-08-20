import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'explore' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'explore', loadChildren: './explore/explore.module#ExploreModule' },
            { path: 'store-app', loadChildren: './store-app/store-app.module#StoreAppModule' },
            { path: 'all-app', loadChildren: './all-app/all-app.module#AllAppModule' }
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LayoutRoutingModule { }