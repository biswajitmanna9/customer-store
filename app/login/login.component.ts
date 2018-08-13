import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../core/services/login.service";
import { getString, setString, getBoolean, setBoolean, clear } from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  processing = false;
  private feedback: Feedback;
  constructor(
    private page: Page,
    private router: RouterExtensions,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.page.actionBarHidden = true;
    this.feedback = new Feedback();
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
          this.processing = false;
          clear();
          setBoolean("isLoggedin", true)
          
          if(res.email != null){
            setString('email', res.email)
          }
          
          setString('contact_no', res.contact_no)
          setString('user_id', res.user_id.toString())
          this.router.navigate(['/'])          
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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  skip() {
    setBoolean("isSkipped", true)
    this.router.navigate(['/'])    
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

}