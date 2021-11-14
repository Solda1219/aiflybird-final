import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { CommonFunctionService } from '../../../../function/commonFunction.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  loading = false;
  email= '';
  cookie= '';
  NewPasswordFormGroup: FormGroup;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
    private activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.email= params['email'];
      this.cookie= params['cookie'];
    })
    this.resetFormSet();
  }
  async resetFormSet() {
    this.NewPasswordFormGroup = this._formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass:['', Validators.required],
    });
  }

  async changePass(){
    if(this.NewPasswordFormGroup.value.pass.length < 8) {
      this.userService.errorMessage(this.cf.translate('Password must be 8 characters long.'))
      return
    }
    if(this.NewPasswordFormGroup.value.pass!= this.NewPasswordFormGroup.value.confirmPass){
      this.userService.errorMessage(this.cf.translate('Password and confirmed password mismatch!'))
      return
    }
    this.loading = true;
    this.userService.postRequest('_api/changePass', {email:this.email, cookie: this.cookie, password: this.NewPasswordFormGroup.value.pass}, false).subscribe(
      res => {
        this.loading = false;
        this.userService.gotoURL('/reset-pass/success');
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )

      
  }
}
