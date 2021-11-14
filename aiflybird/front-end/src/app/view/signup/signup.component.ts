import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  formGroup: FormGroup;
  currentLanguage = "english";
  captcha;
  @ViewChild('captchaImage') captchaImageTag: ElementRef;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf: CommonFunctionService,
  ) { }

  async ngOnInit() {
    
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      display_name: ['', Validators.required],
      business_name: [''],
      company_size: [''],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', Validators.required],
      captcha: ['', Validators.required],
      plans_id: [1],
      activated: [false]
    });
    await this.getCaptcha();
  }
  async getCaptcha(){
    try{
      const res = await this.userService.getRequest('_api/captchaBlob/100/50/',false).toPromise();
      this.captcha = res['text'];
      this.formGroup.patchValue(
        {captcha:''}
      );
      this.captchaImageTag.nativeElement.src = res['image'];
    }
    catch(err){

    }
  }
  async isEmailNameUnique(email, name) {
    const status = await this.userService.postRequest('_api/isEmailNameUnique', { email: email, name: name }, false).toPromise();
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
  getFormValidationErrors() {
    Object.keys(this.formGroup.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          if(keyError== 'email'){
            this.userService.errorMessage('Email format is not correct!');
          }
          this.userService.errorMessage('Fill '+ key.toUpperCase()+ ' field correctly!');
        });
      }
    });
  }
  async signup() {
    //validation part------
    if (this.formGroup.value.password.length < 8) {
      this.userService.errorMessage(this.cf.translate('Password must be 8 characters long.'))
      return
    }
    this.getFormValidationErrors()
    if(!this.formGroup.valid) {
      return
    }
    
    
    if (this.formGroup.value.password != this.formGroup.value.passwordConfirm) {
      this.userService.errorMessage(this.cf.translate('Password and confirmed password mismatch!'))
      return
    }
    //captcha
    if (this.formGroup.value.captcha != this.captcha) {
      this.userService.errorMessage(this.cf.translate('Verification code is not correct!'))
      return
    }
    this.loading = true;
    try {
      const unique = await this.isEmailNameUnique(this.formGroup.value.email, this.formGroup.value.display_name)
      if (unique['message'] == 'ok') {
        this.userService.postRequest('_api/user/signup', this.formGroup.value, false).subscribe(
          res => {
            localStorage.setItem('verifyEmail', this.formGroup.value.email);
            localStorage.setItem('verifyFor', 'signup');
            this.userService.postRequest('_api/sendVerifyEmail', {to: this.formGroup.value.email, verifyFor:"signup"}, false).subscribe(
              res => {
                this.loading = false;
                this.userService.gotoURL('/verification')
              },
              err => {
                this.loading = false;
                this.userService.handleError(err)
              }
            )
            // this.userService.setToken(
            //   {
            //     token: res['token'],
            //     userInfo: res['userInfo'],
            //     expiresAt: res['expiresAt'],
            //   }
            // );
            // this.userService.setUserInfo(
            //   res['userInfo']
            // );
          },
          err => {
            this.loading = false;
            this.userService.handleError(err)
          }
        )
      } else {
        this.userService.errorMessage(unique['message']);
      }
        
    }
    catch (err) {
      console.log(err)
    }
    
    // const loginData = this.formGroup.value;
    // this.loading = true;
    // this.userService.postRequest('_api/user/login', loginData, false).subscribe(
    //   res => {
    //     this.loading = false;
    //     this.userService.setToken(
    //       {
    //         token: res['token'],
    //         userInfo: res['userInfo'],
    //         expiresAt: res['expiresAt'],
    //       }
    //     );
    //     this.userService.setUserInfo(
    //       res['userInfo']
    //     );
    //     this.userService.gotoFirstPage()
    //   },
    //   err => {
    //     this.loading = false;
    //     this.userService.handleError(err)
    //   }
    // )
  }
}
