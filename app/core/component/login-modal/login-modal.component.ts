import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { SignUpModalComponent } from '../signup-modal/signup-modal.component';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
@Component({
    selector: "login-modal",
    moduleId: module.id,
    templateUrl: "login-modal.component.html",
    styleUrls: ["login-modal.component.css"]
})

export class LoginModalComponent implements OnInit {

    form: FormGroup;
    processing = false;

    constructor(
        private page: Page,
        private router: Router,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private params: ModalDialogParams,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
    }

    displayFieldCss(field: string) {
        return {
            'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
            'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
        };
    }



    signIn() {
        if (this.form.valid) {
            this.processing = true;
            this.loginService.login(this.form.value).subscribe(
                res => {
                    console.log(res)
                    setBoolean("isLoggedin", true)
                    setString('email', res.email)
                    setString('contact_no', res.contact_no)
                    setString('user_id', res.user_id.toString())
                    this.params.closeCallback(res);
                },
                error => {
                    console.log(error)
                }
            )
        }
        else {
            this.markFormGroupTouched(this.form)
        }
    }

    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }


    signUp() {
        this.params.closeCallback({ "signup": true });
    }

    close() {
        this.params.closeCallback({ "close": true });
    }

}