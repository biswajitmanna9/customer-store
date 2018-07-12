import { Component, OnInit } from '@angular/core';
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
export class SignupComponent implements OnInit {

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
      customer_name: [null, Validators.required],
      email: [null, [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      contact_no: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      password: [null, Validators.required]
    });

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
          setBoolean("isLoggedin", true)
          setString('email', res.email)
          setString('contact_no', res.contact_no)
          setString('user_id', res.user_id)
          this.router.navigate(['/'])
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

  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}