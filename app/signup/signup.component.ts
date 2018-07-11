import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Component({
    selector: "signup",
    moduleId: module.id,
    templateUrl: "./signup.component.html",
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  form: FormGroup;
  processing = false;

  constructor(
    private page: Page,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email_or_phone: [null, Validators.required],
      password: [null, Validators.required]
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
      
    }
    else {
      this.markFormGroupTouched(this.form)
    }
  }
}