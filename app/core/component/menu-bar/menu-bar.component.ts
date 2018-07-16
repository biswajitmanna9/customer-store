import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignUpModalComponent } from '../signup-modal/signup-modal.component';
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: "menu-bar",
    moduleId: module.id,
    templateUrl: "./menu-bar.component.html",
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
    options = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };
    constructor(
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: Router,
    ) {

    }

    openLoginModal() {
        this.modal.showModal(LoginModalComponent, this.options).then(res => {
            console.log(res);
            if (res.signup) {
                this.openSignupModal();
            }
            else if (res.success == 1) {
                this.router.navigate(['/dashboard'])
            }
        })
    }

    openSignupModal() {
        this.modal.showModal(SignUpModalComponent, this.options).then(res => {
            console.log(res);
            if (res.signin) {
                this.openLoginModal();
            }
            else if (res.success == 1) {
                this.router.navigate(['/dashboard'])
            }
        })
    }

    goTodashboard() {
        if (!getBoolean('isLoggedin')) {
            this.openLoginModal();
        }
        else {
            this.router.navigate(['/dashboard'])
        }
    }
}