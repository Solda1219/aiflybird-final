import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { CommonFunctionService } from '../../../../function/commonFunction.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  loading = false;
  formGroup: FormGroup;
  currentLanguage = "english";
  captcha;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf: CommonFunctionService,
  ) { }

  ngOnInit(): void {
  }

  async resendVerifyCode() {
    this.loading = true;
    var to = localStorage.getItem('verifyEmail');
    var verifyFor= localStorage.getItem('verifyFor');
    this.userService.postRequest('_api/sendVerifyEmail', {to, verifyFor}, false).subscribe(
      res => {
        this.loading = false;
        this.userService.successMessage("Resend successfully!")
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }

}
