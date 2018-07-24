import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
@Component({
    selector: "signup-modal",
    moduleId: module.id,
    templateUrl: "signup-modal.component.html",
    styleUrls: ["signup-modal.component.css"],
    providers: [ActionBarComponent]
})

export class SignUpModalComponent implements OnInit {

    form: FormGroup;
    processing = false;
    private feedback: Feedback;
    constructor(
        private page: Page,
        private router: Router,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private params: ModalDialogParams,
        private actionBarComponent: ActionBarComponent
    ) {
        this.feedback = new Feedback();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            customer_name: ['', Validators.required],
            email: ['', [
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            ]],
            contact_no: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(12)
            ]],
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

    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    signUp() {
        if (this.form.valid) {
            this.processing = true;
            this.loginService.signup(this.form.value).subscribe(
                res => {
                    console.log(res)
                    this.processing = false;
                    setBoolean("isLoggedin", true)
                    if (res.email != "") {
                        setString('email', res.email)
                    }
                    setString('contact_no', res.contact_no)
                    setString('user_id', res.user_id.toString())
                    this.actionBarComponent.setIsLogin();
                    this.params.closeCallback(res);
                },
                error => {
                    this.processing = false;
                    console.log(error)
                    this.feedback.error({
                        title: error.error.msg,
                        backgroundColor: new Color("red"),
                        titleColor: new Color("black"),
                        position: FeedbackPosition.Bottom,
                        type: FeedbackType.Custom
                    });
                }
            )
        }
        else {
            this.markFormGroupTouched(this.form)
        }
    }

    signIn() {
        this.params.closeCallback({ "signin": true });
    }

    close() {
        this.params.closeCallback({ "close": true });
    }

}