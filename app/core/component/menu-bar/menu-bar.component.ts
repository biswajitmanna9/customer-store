import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from '@angular/common';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

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
    private feedback: Feedback;
    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: RouterExtensions,
        private location: Location,
    ) {
        this.feedback = new Feedback()
    }

    ngOnInit() {
        var full_location = this.location.path().split('/');
        this.current_url = full_location[1];
    }


    goTodashboard() {
        if (!getBoolean('isLoggedin')) {
            this.feedback.error({
                title: "You have to login first",
                backgroundColor: new Color("red"),
                titleColor: new Color("black"),
                position: FeedbackPosition.Bottom,
                type: FeedbackType.Custom
            });
            this.router.navigate(["/login"], { clearHistory: true });
        }
        else {
            this.router.navigate(['/dashboard'])
        }
    }
}