import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from '@angular/common';
@Component({
    selector: "menu-bar",
    moduleId: module.id,
    templateUrl: "./menu-bar.component.html",
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    current_url: string;
    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: RouterExtensions,
        private location: Location,
    ) {

    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        console.log(full_location)
        this.current_url = full_location[1];
    }
    

    goTodashboard() {
        if (!getBoolean('isLoggedin')) {
            this.router.navigate(["/login"], { clearHistory: true });
        }
        else {
            this.router.navigate(['/dashboard'])
        }
    }
}