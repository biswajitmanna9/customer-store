import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggingIn = true;
  processing = false;
  user = {
    email: '',
    password: '',
    mobile: ''
  }

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
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      password: [null, Validators.required],
      mobile: [null, Validators.required]
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

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {

    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(res => {
        console.log(res)
        setBoolean("isLoggedin", true)
        setString('token', "gfjhgjkfdhgkfhg")
        console.log(getBoolean('isLoggedin'))
        console.log(getString('token'))
      })
    }
    else {
      this.markFormGroupTouched(this.form)
    }
    // if (!this.user.email || !this.user.password) {
    //   this.alert("Please provide both an email address and password.");
    //   return;
    // }

    // this.processing = true;
    // if (this.isLoggingIn) {
    //   this.login();
    // } else {
    //   this.register();
    // }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  skip() {
    setBoolean("isLoggedin", true)
    setString('token', "gfjhgjkfdhgkfhg")
    this.router.navigate(['/'])
  }

  login() {
    console.log(this.user)
    this.router.navigate(['/'])
  }

  register() {

  }

  forgotPassword() {
    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for Shyam Future Store to reset your password.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {

      }
    });
  }


  alert(message: string) {
    return alert({
      title: "Shyam Future Store",
      okButtonText: "OK",
      message: message
    });
  }
}