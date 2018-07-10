import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggingIn = true;
  processing = false;
  user = {
    email: '',
    password: '',
    mobile: ''
  }
  @ViewChild("password") password: ElementRef;
  @ViewChild("mobile") mobile: ElementRef;

  constructor(private page: Page, private router: Router) {
    this.page.actionBarHidden = true;
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {    
    if (!this.user.email || !this.user.password) {
      this.alert("Please provide both an email address and password.");
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  skip() {
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

  focusPassword() {
    this.password.nativeElement.focus();
  }
  
  focusMobile() {
    if (!this.isLoggingIn) {
      this.mobile.nativeElement.focus();
    }
  }

  alert(message: string) {
    return alert({
      title: "Shyam Future Store",
      okButtonText: "OK",
      message: message
    });
  }
}