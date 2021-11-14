import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  AccountFormGroup: FormGroup;
  NewPasswordFormGroup: FormGroup;
  password_reseted = false;
  notRobot = false;
  isEditable = false;
  captcha;
  @ViewChild('captchaImage') captchaImageTag: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
  ) {}

  async ngOnInit() {
    this.resetFormSet();
  }
  async resetFormSet() {
    this.notRobot = false;
    
    this.AccountFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      captcha:['', Validators.required],

    });
    await this.getCaptcha();
    
  }
  //captcha
  async getCaptcha(){
    try{
      const res = await this.userService.getRequest('_api/captchaBlob/100/50/',false).toPromise();
      this.captcha = res['text'];
      this.AccountFormGroup.patchValue(
        {captcha:''}
      );
      this.captchaImageTag.nativeElement.src = res['image'];
    }
    catch(err){

    }
  }
  async isEmailExists(email) {
    const status = await this.userService.postRequest('_api/isEmailExists', { email: email }, false).toPromise();
    //   .subscribe(
    //     res => {
    //       return "sdfsfsfdsdfsdfsfd";
    //     },
    //     err => {
    //       this.loading = false;
    //       this.userService.handleError(err) 
    //     }
    // )
    return status;
    
  }
  async resetPassVerify() {
    if(!this.AccountFormGroup.valid) {
      this.userService.errorMessage(this.cf.translate('Please fill all required fields correctly.'))
      return
    }
    //captcha
    if (this.AccountFormGroup.value.captcha != this.captcha) {
      this.userService.errorMessage(this.cf.translate('Verification code is not correct!'))
      return
    }
    this.loading = true;
    const exist = await this.isEmailExists(this.AccountFormGroup.value.email)
      if (exist['message'] == 'ok') {
        localStorage.setItem('verifyEmail', this.AccountFormGroup.value.email);
        localStorage.setItem('verifyFor', 'resetPass');
        this.userService.postRequest('_api/sendVerifyEmail', {to: this.AccountFormGroup.value.email, verifyFor: "resetPass"}, false).subscribe(
          res => {
            this.loading = false;
            this.userService.gotoURL('/reset-pass/verification')
          },
          err => {
            this.loading = false;
            this.userService.handleError(err)
          }
        )

      } else {
        this.userService.errorMessage(exist['message']);
      }
  }

  //LanguageChagePart
  gotoLogin(){
    this.userService.gotoLogin();
  }
}
