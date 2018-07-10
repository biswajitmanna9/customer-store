import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Injectable()
export class AuthGuard implements CanLoad {
    isLoggedin: boolean;
    constructor(private _routerExtensions: RouterExtensions) { }

    canLoad(): boolean {
        if (!getBoolean('isLoggedin')) {
            this._routerExtensions.navigate(["login"], { clearHistory: true });
        }
        return true;
    }
}