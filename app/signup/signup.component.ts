import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
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
    private router: RouterExtensions,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.page.actionBarHidden = true;
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
          clear();
          setBoolean("isLoggedin", true)
          if(res.email != ""){
            setString('email', res.email)
          }          
          setString('contact_no', res.contact_no)
          setString('user_id', res.user_id.toString())
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